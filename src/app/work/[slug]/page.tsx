import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/site";
import { ProjectVisual } from "@/components/project-card";
import { Gallery } from "@/components/gallery";
import { Arrow, ArrowUpRight } from "@/components/icons";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.name} — Flutter Case Study`, description: project.summary, alternates: { canonical: absoluteUrl(`/work/${slug}/`) }, openGraph: { title: `${project.name} — Mohammed Adel`, description: project.summary, url: absoluteUrl(`/work/${slug}/`), images: [{ url: `/images/social/${slug}.png`, width: 1200, height: 630, alt: `${project.name} — Flutter case study by Mohammed Adel` }] }, twitter: { card: "summary_large_image", title: `${project.name} — Mohammed Adel`, description: project.summary, images: [`/images/social/${slug}.png`] } };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const related = project.related ? getProject(project.related) : undefined;
  return <main id="main" className="case-study">
    <div className="container">
      <a className="back-link" href="/#work"><Arrow className="rotate-arrow" /> All selected work</a>
      <header className="case-header"><div className="eyebrow"><span className="section-dash" /> {project.category.toUpperCase()}</div><h1>{project.name}<span>.</span></h1><p>{project.tagline}</p><div className="case-meta"><div><span>MY ROLE</span><strong>{project.role}</strong></div><div><span>TEAM / COMPANY</span><strong>{project.company}</strong></div><div><span>PLATFORMS</span><strong>Android & iOS</strong></div><div><span>BUILT WITH</span><strong>{project.stack.join(" · ")}</strong></div></div></header>
      <ProjectVisual project={project} className="case-visual" />
      <section className="case-story" aria-labelledby="story-title"><div><div className="eyebrow"><span className="section-dash" /> THE CONTEXT</div><h2 id="story-title">The product.<br /><span>My part in it.</span></h2></div><div className="case-story-copy"><h3>The problem</h3><p>{project.problem}</p><h3>My contribution</h3><p>{project.contribution}</p></div></section>
      <section className="case-features" aria-label="What I built">{project.features.map((feature, idx) => <article key={feature.title}><span className="feature-number">0{idx + 1}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</section>
      <section className="case-gallery" aria-labelledby="screens-title"><div className="section-heading"><div><div className="eyebrow"><span className="section-dash" /> A CLOSER LOOK</div><h2 id="screens-title">Inside the app<span>.</span></h2></div><p>Real screens from the product.<br />Select any image to take a closer look.</p></div><Gallery screens={project.screens} name={project.name} /></section>
      <section className="case-outcome"><div className="eyebrow">THE RESULT</div><h2>{project.outcome}</h2>{project.store && <a className="inline-link" href={project.store.href} rel="noreferrer" target="_blank">{project.store.label}<ArrowUpRight /></a>}{related && <Link className="inline-link" href={`/work/${related.slug}/`}>Explore the companion app: {related.name}<ArrowUpRight /></Link>}</section>
      <Link href={`/work/${next.slug}/`} className="next-project"><div><span className="eyebrow">UP NEXT · 0{(index + 1) % projects.length + 1} / 06</span><h2>{next.name}</h2><p>{next.category}</p></div><span className="next-project-arrow"><ArrowUpRight /></span></Link>
    </div>
  </main>;
}
