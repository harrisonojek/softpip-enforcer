import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"C:\Users\harry\.gemini\antigravity\scratch\softpip-enforcer\public"
brand_dir = os.path.join(public_dir, "brand")
images_dir = os.path.join(public_dir, "images")
os.makedirs(brand_dir, exist_ok=True)
os.makedirs(images_dir, exist_ok=True)

src_path = os.path.join(brand_dir, "lockup.png")
im = Image.open(src_path).convert("RGBA")

# 1. Crop the square tile tightly to its rounded edge (inside the anti-aliased outer dark ring)
# Measured interior-to-edge transition: left=219, top=239, right=458, bottom=478 -> 239x239 square
tile = im.crop((219, 239, 458, 478))

def apply_rounded_corners(img, radius_pct=0.22):
    w, h = img.size
    r = int(round(min(w, h) * radius_pct))
    # Render mask at 4x resolution for silky anti-aliased rounded corners
    scale = 4
    mask = Image.new("L", (w * scale, h * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w * scale - 1, h * scale - 1)], radius=r * scale, fill=255)
    mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    result = img.copy()
    result.putalpha(mask)
    return result

tile_rounded = apply_rounded_corners(tile, 0.22)

# Export icon sizes into public/
for size, name in [
    (32, "icon-32.png"),
    (192, "icon-192.png"),
    (512, "icon-512.png"),
    (180, "apple-touch-icon.png"),
]:
    res = tile_rounded.resize((size, size), Image.Resampling.LANCZOS)
    res.save(os.path.join(public_dir, name))
    print(f"Saved {name} ({size}x{size})")

# Export multi-size favicon.ico
f32 = tile_rounded.resize((32, 32), Image.Resampling.LANCZOS)
f32.save(
    os.path.join(public_dir, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
)
print("Saved favicon.ico")

# 2. Extract wordmark + divider cleanly using proportional alpha unblending against bg (22, 29, 37)
wm_area = im.crop((515, 226, 1065, 495))
wm_rgba = Image.new("RGBA", wm_area.size, (0, 0, 0, 0))
src_pix = wm_area.load()
dst_pix = wm_rgba.load()

bg_r, bg_g, bg_b = 22.0, 29.0, 37.0
fg_r, fg_g, fg_b = 138.0, 245.0, 206.0  # #8AF5CE

for y in range(wm_area.height):
    for x in range(wm_area.width):
        r, g, b, _ = src_pix[x, y]
        # Compute normalized intensity above background toward mint
        dg = max(0.0, (g - bg_g) / (fg_g - bg_g))
        db = max(0.0, (b - bg_b) / (fg_b - bg_b))
        dr = max(0.0, (r - bg_r) / (fg_r - bg_r))
        alpha_f = max(dg, (dg * 0.7 + db * 0.2 + dr * 0.1))
        if alpha_f < 0.06:
            dst_pix[x, y] = (0, 0, 0, 0)
        else:
            alpha_f = min(1.0, alpha_f * 1.12)
            # Unmix color toward foreground mint without dark fringe
            ur = int(min(255, max(0, (r - (1.0 - alpha_f) * bg_r) / alpha_f)))
            ug = int(min(255, max(0, (g - (1.0 - alpha_f) * bg_g) / alpha_f)))
            ub = int(min(255, max(0, (b - (1.0 - alpha_f) * bg_b) / alpha_f)))
            dst_pix[x, y] = (ur, ug, ub, int(round(alpha_f * 255)))

# Assemble full lockup canvas (tile width 239 at left, gap/divider + wordmark at offset 296)
full_w = 296 + wm_rgba.width
full_h = 269  # 495 - 226
full_lockup = Image.new("RGBA", (full_w, full_h), (0, 0, 0, 0))
# Center tile vertically on 269px divider height (offset y = (269 - 239) // 2 = 15)
full_lockup.paste(tile_rounded, (0, 15), tile_rounded)
full_lockup.paste(wm_rgba, (296, 0), wm_rgba)

# Crop tight horizontally around content
bbox_lockup = full_lockup.getbbox()
if bbox_lockup:
    full_lockup = full_lockup.crop(bbox_lockup)

target_h = 52  # 2x of 26px nav height
target_w = int(round(full_lockup.width * (target_h / full_lockup.height)))
nav_2x = full_lockup.resize((target_w, target_h), Image.Resampling.LANCZOS)
nav_2x.save(os.path.join(brand_dir, "nav-lockup.png"))
print(f"Saved nav-lockup.png at 2x ({target_w}x{target_h})")

# Standalone 2x icon for mobile <480px nav (52x52)
icon_nav_2x = tile_rounded.resize((52, 52), Image.Resampling.LANCZOS)
icon_nav_2x.save(os.path.join(brand_dir, "nav-icon.png"))
print("Saved nav-icon.png at 2x (52x52)")

# 3. Generate og-default.png at 1200x630
og = Image.new("RGBA", (1200, 630), (8, 11, 15, 255))

# Subtle radial mint bloom behind the center (8% opacity)
bloom = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
bloom_draw = ImageDraw.Draw(bloom)
for rad in range(340, 0, -4):
    alpha = int(20 * (1 - rad / 340))
    bloom_draw.ellipse([600 - rad, 300 - rad, 600 + rad, 300 + rad], fill=(138, 245, 206, alpha))
og = Image.alpha_composite(og, bloom)

# Icon centered at 96px on --void
icon_96 = tile_rounded.resize((96, 96), Image.Resampling.LANCZOS)
og.paste(icon_96, (600 - 48, 155), icon_96)

# Extract pure wordmark ("SoftPip") without divider line for OG centered lockup
wordmark_only = wm_rgba.crop((50, 0, wm_rgba.width, wm_rgba.height))
wm_bbox = wordmark_only.getbbox()
if wm_bbox:
    wordmark_only = wordmark_only.crop(wm_bbox)
wm_h = 64
wm_w = int(round(wordmark_only.width * (wm_h / wordmark_only.height)))
wm_res = wordmark_only.resize((wm_w, wm_h), Image.Resampling.LANCZOS)
og.paste(wm_res, (600 - wm_w // 2, 282), wm_res)

# Body text: "Free curriculum. Free risk bot. $10 to start."
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
og_draw.text((600 - t_w // 2, 392), text_str, fill=(154, 166, 178, 255), font=font)

og_rgb = og.convert("RGB")
og_rgb.save(os.path.join(public_dir, "og-default.png"), quality=95)
og_rgb.save(os.path.join(images_dir, "og-default.png"), quality=95)
print("Saved og-default.png (1200x630)")
