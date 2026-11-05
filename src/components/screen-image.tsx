import type { Screen } from "@/content/portfolio";

export function ScreenImage({ screen, priority = false, full = false, decorative = false }: { screen: Screen; priority?: boolean; full?: boolean; decorative?: boolean }) {
  const widths = screen.kind === "landscape" ? [560, 1120, 1600] : [320, 640, 960];
  return <img
    src={`/images/projects/${screen.id}-${full ? widths[2] : widths[1]}.webp`}
    srcSet={widths.map((width) => `/images/projects/${screen.id}-${width}.webp ${width}w`).join(", ")}
    sizes={full ? "(max-width: 700px) 90vw, (max-width: 1100px) 50vw, 640px" : screen.kind === "landscape" ? "(max-width: 700px) 85vw, 440px" : "(max-width: 700px) 40vw, 260px"}
    width={screen.width} height={screen.height} alt={decorative ? "" : screen.caption}
    loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" draggable={false}
  />;
}

export function Device({ screen, className = "", priority = false, decorative = true }: { screen: Screen; className?: string; priority?: boolean; decorative?: boolean }) {
  return <div className={`device ${screen.kind === "phone" ? "device-phone" : "device-composition"} ${screen.kind === "landscape" ? "device-landscape" : ""} ${className}`}>
    <div className="device-screen"><ScreenImage screen={screen} priority={priority} decorative={decorative} /></div>
    {screen.kind === "phone" && <><span className="device-key device-key-volume" aria-hidden="true" /><span className="device-key device-key-mute" aria-hidden="true" /><span className="device-reflection" aria-hidden="true" /></>}
  </div>;
}
