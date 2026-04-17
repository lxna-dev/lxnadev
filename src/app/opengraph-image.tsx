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
          backgroundColor: "#e1e1e2",
          display: "flex",
          flexDirection: "column",
          padding: "0 80px",
          fontFamily: "monospace",
        }}
      >
        {/* Meta bar — mirrors "— 01 | Portfolio / 2026" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #100f10",
            padding: "28px 0",
            color: "#656465",
            fontSize: 18,
            letterSpacing: "6px",
            textTransform: "uppercase",
          }}
        >
          <span>— 01</span>
          <span>Portfolio / 2026</span>
        </div>

        {/* Name — dominant visual */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: 56,
          }}
        >
          <span
            style={{
              color: "#100f10",
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            LXNA
          </span>
          <span
            style={{
              color: "#cd1b25",
              fontSize: 148,
              fontWeight: 900,
              letterSpacing: "-4px",
              lineHeight: 1,
            }}
          >
            .DEV
          </span>
        </div>

        {/* Roles — left-border accent, mirrors Hero role block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "3px solid #100f10",
            paddingLeft: 20,
            marginTop: 36,
            gap: 6,
          }}
        >
          <span
            style={{
              color: "#100f10",
              fontSize: 22,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Full Stack Developer
          </span>
          <span
            style={{
              color: "#100f10",
              fontSize: 22,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            GoHighLevel Technical Specialist
          </span>
        </div>

        {/* Bottom — url */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
            paddingBottom: 40,
            color: "#656465",
            fontSize: 18,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          <span>lxna.dev ↗</span>
        </div>
      </div>
    ),
    size,
  );
}
