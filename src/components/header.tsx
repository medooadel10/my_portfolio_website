"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/content/portfolio";
import { Download } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const home = pathname === "/";
  const links = [["Work", "work"], ["Expertise", "expertise"], ["Experience", "experience"], ["Contact", "contact"]];
  return <header className="site-header">
    <div className="reading-progress" aria-hidden="true" />
    <div className="container header-inner">
      <Link href="/" className="wordmark" aria-label="Mohammed Adel home" onClick={() => setOpen(false)}><span className="header-portrait"><img src="/images/mohammed-adel.webp" width={40} height={40} alt="" fetchPriority="high" /></span><span>mohammed adel<span className="wordmark-dot">.</span></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`${home ? "" : "/"}#${id}`}>{label}</a>)}</nav>
      <a className="button button-small button-outline header-cv" href={profile.cv} download>Download CV <Download /></a>
      <button className={`menu-toggle ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, id]) => <a key={id} href={`${home ? "" : "/"}#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href={profile.cv} download onClick={() => setOpen(false)}>Download CV <Download /></a></nav>}
  </header>;
}
