"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CTA_HREF, NAV_LINKS } from "@/lib/content";
import BrandMark from "./BrandMark";
import styles from "./Header.module.css";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* Destaca no menu a seção que está na tela. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visivel = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visivel) setActiveId(visivel.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Esc fecha o painel e devolve o foco ao botão. Clique fora também fecha. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      burgerRef.current?.focus();
    };
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  /* Ao voltar para a largura de desktop o painel não faz mais sentido. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 780px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [close]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Navegação principal">
      <div className={`${styles.navShell} ${styles.row}`}>
        <a className={styles.brand} href="#topo" aria-label="Talkwise, ir para o topo">
          <BrandMark />
          Talkwise
        </a>

        <div className={styles.links}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeId === link.href.slice(1) ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a href={CTA_HREF} className={styles.ctaBtn}>
            Reservar aula
          </a>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((valor) => !valor)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="menu-mobile" className={styles.panel} data-open={open} aria-hidden={!open}>
        <div className={`${styles.navShell} ${styles.panelInner}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className={styles.panelLink}
              href={link.href}
              onClick={close}
              tabIndex={open ? undefined : -1}
              aria-current={activeId === link.href.slice(1) ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            className={`${styles.ctaBtn} ${styles.panelCta}`}
            href={CTA_HREF}
            onClick={close}
            tabIndex={open ? undefined : -1}
          >
            Reservar aula
          </a>
        </div>
      </div>
    </nav>
  );
}
