"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Screen } from "@/content/portfolio";
import { Arrow, ArrowUpRight } from "./icons";
import { ScreenImage } from "./screen-image";

export function Gallery({ screens, name }: { screens: Screen[]; name: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => { dialog.current?.close(); setSelected(null); opener.current?.focus(); }, []);
  const navigate = useCallback((offset: number) => setSelected((value) => value === null ? value : (value + offset + screens.length) % screens.length), [screens.length]);

  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current?.open) dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  return <>
    <div className="gallery-grid">{screens.map((screen, index) => <figure key={screen.id} className={`gallery-item gallery-${screen.kind}`}>
      <button className="gallery-trigger" aria-label={`Enlarge ${screen.caption}`} aria-haspopup="dialog" onClick={(event) => { opener.current = event.currentTarget; setSelected(index); }}>
        <div className={screen.kind === "phone" ? "gallery-device" : "gallery-composition"}><ScreenImage screen={screen} /></div><span className="gallery-enlarge"><ArrowUpRight /></span>
      </button>
      <figcaption><span>0{index + 1}</span>{screen.caption}</figcaption>
    </figure>)}</div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-caption" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === dialog.current) close(); }} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); navigate(1); } if (event.key === "ArrowLeft") { event.preventDefault(); navigate(-1); } }}>
      {selected !== null && <div className="lightbox-inner">
        <div className="lightbox-top"><span>{name} <span className="lightbox-count">{selected + 1} / {screens.length}</span></span><button className="lightbox-close" autoFocus onClick={close} aria-label="Close screenshot">✕</button></div>
        <div className="lightbox-image"><ScreenImage screen={screens[selected]} full priority /></div>
        <div className="lightbox-bottom"><button onClick={() => navigate(-1)} aria-label="Previous screenshot"><Arrow className="rotate-arrow" /></button><p id="lightbox-caption" aria-live="polite">{screens[selected].caption}</p><button onClick={() => navigate(1)} aria-label="Next screenshot"><Arrow /></button></div>
      </div>}
    </dialog>
  </>;
}
