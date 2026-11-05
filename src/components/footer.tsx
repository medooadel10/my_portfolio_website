import Link from "next/link";
import { profile } from "@/content/portfolio";
import { ArrowUpRight, Download } from "./icons";

export function Contact() {
  return <section id="contact" className="contact-section"><div className="container contact-inner">
    <div><div className="eyebrow"><span className="status-dot" /> LET’S CONNECT</div><h2>Your next app.<br /><span>Let’s build it well.</span></h2><p>Looking for a Flutter developer for your team?<br />I’d love to hear what you’re working on.</p><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight /></a></div>
    <div className="contact-links"><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={profile.cv} download>Download my CV <Download /></a><span className="contact-location"><span className="location-dot" /> Based in Cairo, Egypt</span></div>
  </div></section>;
}

export function Footer() {
  return <footer className="site-footer container"><Link href="/" className="footer-name">mohammed adel<span>.</span></Link><span>Thoughtfully built. Ready for what’s next.</span><a href="#top">Back to top ↑</a><span className="copyright">© {new Date().getFullYear()} Mohammed Adel</span></footer>;
}
