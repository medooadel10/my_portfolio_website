import type { Metadata } from "next";
import Link from "next/link";
import { projects, profile, experience, expertise } from "@/content/portfolio";
import { absoluteUrl } from "@/lib/site";
import { Arrow, ArrowUpRight, CodeMark, Download, FlutterMark } from "@/components/icons";
import { Device } from "@/components/screen-image";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = { alternates: { canonical: absoluteUrl("/") } };

export default function Home() {
  const person = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: "Flutter Developer", description: profile.description, image: absoluteUrl("/images/mohammed-adel.webp"), url: absoluteUrl("/"), email: `mailto:${profile.email}`, sameAs: [profile.github, profile.linkedin], knowsAbout: ["Flutter", "Dart", "Mobile application development", "Clean Architecture"], address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" } };
  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" /> MOBILE SOFTWARE ENGINEER</div>
        <h1 id="hero-title">Flutter apps,<br />from architecture<br /><span>to release.</span></h1>
        <div className="hero-author"><img src="/images/mohammed-adel.webp" width={52} height={52} alt="Mohammed Adel" fetchPriority="high" /><div>Hi, I’m Mohammed Adel<span>Flutter Developer · Cairo, Egypt</span></div></div>
        <p className="hero-description">I turn complex ideas into thoughtful Android<br className="desktop-break" /> and iOS experiences. Built with care.<br className="desktop-break" /> Shipped to real users.</p>
        <div className="hero-actions"><a className="button button-dark" href="#work">View my work <ArrowUpRight /></a><a className="button button-text" href={profile.cv} download>Download CV <Download /></a></div>
        <div className="hero-location"><span className="location-dot" /> Cairo, Egypt <span className="hero-location-separator" /> Flutter · Android · iOS</div>
      </div>
      <div className="hero-art" aria-label="Selected screens from CEB LMS and Weevo Merchant">
        <span className="hero-art-kicker">IDEAS → REAL-WORLD APPS</span>
        <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
        <div className="hero-cross hero-cross-one">+</div><div className="hero-cross hero-cross-two">+</div>
        <Device screen={projects[1].screens[0]} className="hero-phone-back" priority />
        <Device screen={projects[2].screens[0]} className="hero-phone-front" priority />
        <span className="hero-flutter"><FlutterMark /> Built with Flutter</span>
        <div className="hero-note"><span className="hero-note-icon"><CodeMark /></span><div>From first commit<span>to the app stores.</span></div><span className="hero-note-check">✓</span></div>
        <span className="hero-art-footer"><span /> A FEW SCREENS. A LOT OF CRAFT.</span>
      </div>
    </section>

    <section className="stats container" aria-label="Experience at a glance"><div className="stats-intro">Good software.<br /><span>Real-world experience.</span></div><div className="stat"><strong>4<span>+</span></strong><p>Years building mobile apps</p></div><div className="stat"><strong>10<span>+</span></strong><p>Apps published on the stores</p></div><div className="stat stat-last"><strong>60<span>%</span></strong><p>Reported performance improvement<br />at Weevo</p></div></section>

    <section id="work" className="work-section container" aria-labelledby="work-title">
      <div className="section-heading"><div><div className="eyebrow"><span className="section-dash" /> SELECTED WORK</div><h2 id="work-title">Different products.<br /><span>The same care.</span></h2></div><p>From a school lunch to a working day.<br />A selection of apps I’ve helped bring to life.</p></div>
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      <div className="work-footnote"><span className="tiny-cross">+</span><p>A selection of my work across education, enterprise, logistics, and services.</p><a href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight /></a></div>
    </section>

    <section id="expertise" className="expertise-section" aria-labelledby="expertise-title"><div className="container">
      <div className="section-heading"><div><div className="eyebrow"><span className="section-dash" /> HOW I BUILD</div><h2 id="expertise-title">More than<br /><span>what’s on screen.</span></h2></div><p>A good interface is just the beginning.<br />Here’s what goes into the apps behind it.</p></div>
      <div className="expertise-grid">{expertise.map((item) => <article key={item.number} className="expertise-card"><span className="expertise-number">{item.number} <CodeMark /></span><h3>{item.title}</h3><p>{item.description}</p><Link href={`/work/${item.link}/`}>{item.example}<ArrowUpRight /></Link></article>)}</div>
      <div className="toolbelt"><span>MY EVERYDAY TOOLKIT</span><div>{["Dart", "Flutter", "BLoC / Cubit", "Firebase", "REST APIs", "Git & CI/CD", "Clean Architecture"].map((tool) => <span key={tool}>{tool}</span>)}</div></div>
    </div></section>

    <section id="experience" className="experience-section container" aria-labelledby="experience-title">
      <div className="experience-intro"><div className="eyebrow"><span className="section-dash" /> THE JOURNEY</div><h2 id="experience-title">Building.<br />Learning.<br /><span>Passing it on.</span></h2><p>Production apps, collaborative teams,<br />and a little time at the whiteboard.</p><div className="about-portrait"><img src="/images/mohammed-adel.webp" width={160} height={180} alt="Mohammed Adel, Flutter developer based in Cairo" loading="lazy" /><div><span className="portrait-mark">ma.</span><p>A developer.<br />A teammate.<br />An instructor.</p></div></div><a className="inline-link" href={profile.cv} download>The full story in my CV <Download /></a><div className="education"><span className="eyebrow">EDUCATION</span><h3>Statistics & Computer Science</h3><p>B.Sc. · Helwan University · 2023</p><h3>Frontend & Cross Platform Mobile</h3><p>Intensive Training Diploma · ITI · 2024</p></div></div>
      <div className="timeline">{experience.map((job) => <article className="timeline-item" key={job.company}><div className="timeline-date">{job.date}<span>{job.tag}</span></div><h3>{job.company}</h3><h4>{job.title}</h4><p>{job.detail}</p></article>)}</div>
    </section>
  </main>;
}
