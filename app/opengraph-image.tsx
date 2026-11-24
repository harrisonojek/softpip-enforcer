import { ImageResponse } from "next/og";

export const alt = "SoftPip — Trade with rules, not feelings.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080B0F",
          color: "#E6EDF3",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "25%",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(122, 243, 198, 0.12) 0%, rgba(8, 11, 15, 0) 70%)",
          }}
        />

        {/* Brand Icon Mark */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "22%",
            backgroundColor: "#7AF3C6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
            boxShadow: "0 0 35px rgba(122, 243, 198, 0.35)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "5px solid #080B0F",
              borderTopColor: "transparent",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "800",
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textAlign: "center",
            marginBottom: "16px",
            lineHeight: 1.15,
            maxWidth: "900px",
          }}
        >
          I lost NGN 32,450,000 trading. This is the bot that would have stopped it.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#7AF3C6",
            fontFamily: "monospace",
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Free curriculum. Free risk bot. $10 to start.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
