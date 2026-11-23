import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"C:\Users\harry\.gemini\antigravity\scratch\softpip-enforcer\public"
brand_dir = os.path.join(public_dir, "brand")
os.makedirs(brand_dir, exist_ok=True)

src_path = os.path.join(brand_dir, "lockup.png")
im = Image.open(src_path).convert("RGBA")

# 1. Square tile crop: 219, 239 to 459, 479 (240x240)
tile = im.crop((219, 239, 459, 479))

def apply_rounded_corners(img, radius_pct=0.22):
    w, h = img.size
    r = int(min(w, h) * radius_pct)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w, h)], radius=r, fill=255)
    result = img.copy()
    result.putalpha(mask)
    return result

tile_rounded = apply_rounded_corners(tile, 0.22)

# Export icon sizes
for size, name in [(32, "icon-32.png"), (192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")]:
    res = tile_rounded.resize((size, size), Image.Resampling.LANCZOS)
    res.save(os.path.join(public_dir, name))
    print(f"Saved {name} ({size}x{size})")

# Favicon.ico
f16 = tile_rounded.resize((16, 16), Image.Resampling.LANCZOS)
f32 = tile_rounded.resize((32, 32), Image.Resampling.LANCZOS)
f48 = tile_rounded.resize((48, 48), Image.Resampling.LANCZOS)
f32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Saved favicon.ico")

# 2. Crop nav-lockup.png at 2x
# Lockup contains tile + divider + wordmark
lockup_crop = im.crop((219, 226, 1061, 495))
target_h = 52 # 2x of 26px
target_w = int(lockup_crop.width * (target_h / lockup_crop.height))

# Transparent background
lockup_rgba = lockup_crop.copy()
pix = lockup_rgba.load()
for y in range(lockup_rgba.height):
    for x in range(lockup_rgba.width):
        r, g, b, a = pix[x, y]
        if x > 240:
            if max(r, g, b) < 65:
                pix[x, y] = (0, 0, 0, 0)
        else:
            if max(r, g, b) < 45:
                pix[x, y] = (0, 0, 0, 0)

nav_2x = lockup_rgba.resize((target_w, target_h), Image.Resampling.LANCZOS)
nav_2x.save(os.path.join(brand_dir, "nav-lockup.png"))
print(f"Saved nav-lockup.png at 2x ({target_w}x{target_h})")

# Also save standalone icon-only for mobile nav (2x of 26px = 52x52)
icon_nav_2x = tile_rounded.resize((52, 52), Image.Resampling.LANCZOS)
icon_nav_2x.save(os.path.join(brand_dir, "nav-icon.png"))
print("Saved nav-icon.png at 2x (52x52)")

# 3. Generate og-default.png at 1200x630
og = Image.new("RGBA", (1200, 630), (8, 11, 15, 255))

# Subtle radial mint bloom behind the center (8% opacity)
bloom = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
bloom_draw = ImageDraw.Draw(bloom)
for rad in range(320, 0, -5):
    alpha = int(22 * (1 - rad / 320))
    bloom_draw.ellipse([600 - rad, 315 - rad, 600 + rad, 315 + rad], fill=(138, 245, 206, alpha))
og = Image.alpha_composite(og, bloom)

# Place 96x96 icon centered horizontally at y=165
icon_96 = tile_rounded.resize((96, 96), Image.Resampling.LANCZOS)
og.paste(icon_96, (600 - 48, 165), icon_96)

# Wordmark beneath (height 68px)
wm_crop = lockup_rgba.crop((355, 60, lockup_rgba.width, lockup_rgba.height - 60))
wm_h = 68
wm_w = int(wm_crop.width * (wm_h / wm_crop.height))
wm_res = wm_crop.resize((wm_w, wm_h), Image.Resampling.LANCZOS)
og.paste(wm_res, (600 - wm_w // 2, 290), wm_res)

# Text: "Free curriculum. Free risk bot. $10 to start."
og_draw = ImageDraw.Draw(og)
font = None
for f_path in ["C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"]:
    if os.path.exists(f_path):
        font = ImageFont.truetype(f_path, 28)
        break
if font is None:
    font = ImageFont.load_default()

text_str = "Free curriculum. Free risk bot. $10 to start."
bbox = og_draw.textbbox((0, 0), text_str, font=font)
t_w = bbox[2] - bbox[0]
og_draw.text((600 - t_w // 2, 400), text_str, fill=(154, 166, 178, 255), font=font)

og.convert("RGB").save(os.path.join(public_dir, "og-default.png"), quality=95)
print("Saved og-default.png with exact text!")
