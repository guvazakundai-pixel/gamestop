import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050506",
          borderRadius: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="round">
          <path d="M12 3v18" />
          <path d="M5 7l14 10" />
          <path d="M19 7L5 17" />
        </svg>
      </div>
    ),
    { ...size }
  );
}