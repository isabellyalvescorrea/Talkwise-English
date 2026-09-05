"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS, PRIMARY_CTA_HREF } from "@/lib/content";
import { IconArrowRight, IconClose, IconMenu } from "./Icons";
import { LogoMark } from "./Illustrations";
import styles from "./Header.module.css";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(SECTION_IDS[0] ?? "");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);

  /* Sombra do cabeçalho a partir do primeiro scroll. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Destaque do link da seção visível. */
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Fecha com Escape, devolvendo o foco ao botão que abriu o menu. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  /* Trava a rolagem do corpo enquanto o menu mobile estiver aberto. */
  useEffect(() => {
    document.body.dataset.scrollLocked = open ? "true" : "false";
    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [open]);

  /* Fecha o painel ao voltar para a largura de desktop. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 60em)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [close]);

  return (
    <header ref={headerRef} className={styles.header} data-scrolled={scrolled}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.logo} href="#inicio" aria-label="Talkwise English — ir para o início">
          <span className={styles.logoMark}>
            <LogoMark size={38} />
          </span>
          <span className={styles.logoText}>
            Talkwise <span>English</span>
          </span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className={styles.navLink}
                  href={link.href}
                  aria-current={activeId === link.href.replace("#", "") ? "true" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a className={`btn btn--primary ${styles.headerCta}`} href={PRIMARY_CTA_HREF}>
            Aula Grátis
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose width={22} height={22} /> : <IconMenu width={22} height={22} />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" className={styles.panel} data-open={open} aria-hidden={!open}>
        <div className={`container ${styles.panelInner}`}>
          <nav aria-label="Navegação principal (mobile)">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    className={styles.panelLink}
                    href={link.href}
                    onClick={close}
                    tabIndex={open ? undefined : -1}
                    aria-current={activeId === link.href.replace("#", "") ? "true" : undefined}
                  >
                    {link.label}
                    <IconArrowRight width={18} height={18} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            className={`btn btn--primary btn--block ${styles.panelCta}`}
            href={PRIMARY_CTA_HREF}
            onClick={close}
            tabIndex={open ? undefined : -1}
          >
            Quero minha aula grátis
          </a>
          <p className={styles.panelNote}>Sem cartão de crédito. Sem compromisso.</p>
        </div>
      </div>

      <div className={styles.backdrop} data-open={open} aria-hidden />
    </header>
  );
}
