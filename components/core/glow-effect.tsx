import { type CSSProperties } from "react";

type GlowEffectProps = {
  colors?: string[];
  mode?: "static" | "animated";
  blur?: "light" | "medium" | "heavy";
  intensity?: number;
  className?: string;
  style?: CSSProperties;
};

const BLUR_MAP = { light: "12px", medium: "20px", heavy: "32px" };
const DEFAULT_COLORS = ["#0894FF", "#C959DD", "#FF2E54", "#FF9004"];

export function GlowEffect({
  colors = DEFAULT_COLORS,
  mode = "animated",
  blur = "medium",
  intensity = 0.55,
  className = "",
  style,
}: GlowEffectProps) {
  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")}, ${colors[0]})`;

  return (
    <div
      className={`glow-effect ${mode === "animated" ? "glow-spin" : ""} ${className}`}
      style={{
        ...style,
        "--glow-gradient": gradient,
        "--glow-blur": BLUR_MAP[blur],
        "--glow-opacity": intensity,
      } as CSSProperties}
      aria-hidden="true"
    />
  );
}
