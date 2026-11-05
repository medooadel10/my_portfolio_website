import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/portfolio";
import { ArrowUpRight } from "./icons";
import { Device } from "./screen-image";

export function ProjectVisual({ project, className = "" }: { project: Project; className?: string }) {
  const canteen = project.slug === "elkanteen";
  const companion = project.screens[project.slug === "ceb-lms" || project.slug === "ceb-workspace" ? 2 : project.slug === "cognitech-workspace" ? 3 : 1];
  const captions: Record<string, string> = {
    elkanteen: "Parent · Student · Cashier",
    weevo: "A merchant’s everyday companion.",
    "ceb-lms": "A learning journey, connected.",
    "ceb-workspace": "A simpler working day.",
    "cognitech-workspace": "People, teams, and everyday operations.",
    linesteel: "Two sides of a better service.",
  };
  const annotation: Record<string, [string, string]> = {
    elkanteen: ["One connected ecosystem", "Three apps, thoughtfully connected"],
    weevo: ["Built for the journey", "From order to delivery"],
    "ceb-lms": ["Learning, in your pocket", "Courses · Training · Progress"],
    "ceb-workspace": ["Your working day", "Attendance · Leave · Approvals"],
    "cognitech-workspace": ["A workspace that travels", "HR · Payroll · Operations"],
    linesteel: ["Service, connected", "Customer ↔ Technician"],
  };
  return <div className={`project-visual showcase visual-${project.slug} ${className}`} style={{ "--project-color": project.color, "--project-ink": project.ink } as CSSProperties} aria-hidden="true">
    <div className="showcase-texture" /><div className="showcase-halo" /><div className="showcase-floor" />
    <div className="visual-label"><span className="visual-dot" />{project.category}</div>
    <div className="visual-brand">{project.name}<span>{captions[project.slug]}</span></div>
    <div className={`mockup-scene ${canteen ? "mockup-ecosystem" : ""}`}>
      <div className="showcase-device showcase-device-primary"><Device screen={project.screens[0]} /></div>
      <div className="showcase-device showcase-device-secondary"><Device screen={companion} /></div>
      {canteen && <div className="showcase-device showcase-device-tablet"><Device screen={project.screens[2]} /></div>}
    </div>
    <div className="showcase-annotation"><span className="showcase-annotation-icon">{canteen ? "3" : "↗"}</span><div>{annotation[project.slug][0]}<span>{annotation[project.slug][1]}</span></div></div>
    <span className="visual-platform">FLUTTER <span>·</span> ANDROID & iOS</span>
    <span className="showcase-index">APP SHOWCASE <span>↗</span></span>
  </div>;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card">
    <Link href={`/work/${project.slug}/`} className="project-link" aria-label={`Explore ${project.name} case study`}>
      <div className="project-image-wrap"><ProjectVisual project={project} /><span className="project-open"><ArrowUpRight /></span></div>
      <div className="project-heading"><h3>{project.name}</h3><span className="project-number">0{index + 1}</span></div>
      <p>{project.summary}</p>
      <div className="project-tags">{project.stack.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <span className="project-read">Explore project <ArrowUpRight /></span>
    </Link>
  </article>;
}
