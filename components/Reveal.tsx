"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso, em milissegundos, aplicado à transição de entrada. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Revela o conteúdo conforme ele entra na viewport.
 * O HTML renderizado no servidor já nasce visível: a animação só é "armada"
 * depois da montagem no cliente, de modo que a página continua legível sem
 * JavaScript e para quem prefere movimento reduzido.
 */
export default function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion) return;

    node.classList.add("revealArmed");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealVisible");
          observer.disconnect();
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
