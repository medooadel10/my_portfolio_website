import Link from "next/link";
import { Arrow } from "@/components/icons";

export default function NotFound() { return <main id="main" className="not-found container"><div className="eyebrow">404 · A SMALL DETOUR</div><h1>This screen<br />isn’t here<span>.</span></h1><p>Let’s get you back to the work.</p><Link href="/" className="button button-dark">Back to the portfolio <Arrow /></Link></main>; }
