import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#100f10",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            LXNA
          </span>
          <span
            style={{
              color: "#cd1b25",
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            .DEV
          </span>
        </div>

        <span
          style={{
            color: "#656465",
            fontSize: 24,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          Full Stack Developer · GoHighLevel Specialist
        </span>
      </div>
    ),
    size,
  );
}
