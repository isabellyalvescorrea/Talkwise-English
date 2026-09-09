"use client";

import { useEffect, useRef } from "react";
import { CTA_HREF, TICKET } from "@/lib/content";
import styles from "./BoardingPass.module.css";

/* O protótipo desenha 30 barras e distribui as alturas por nth-child no CSS,
   sem valor inline: nenhuma altura é sorteada, então não há divergência de
   hidratação. */
const BARRAS = 30;

export default function BoardingPass() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alvo = wrapRef.current;
    if (!alvo) return;

    /* A classe entra só depois de montar. No HTML servido as animações correm
       soltas, de modo que quem estiver sem JavaScript vê o cartão aberto em
       vez de um cartão dobrado para sempre. Daqui em diante elas ficam
       pausadas até o cartão aparecer na tela. */
    alvo.classList.add(styles.controlada);

    if (typeof IntersectionObserver === "undefined") {
      alvo.classList.add(styles.naTela);
      return;
    }

    /* Mesma lógica do protótipo: solta a animação quando o cartão entra na
       tela e para de observar, para o ciclo seguir em laço a partir dali. */
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            alvo.classList.add(styles.naTela);
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <div className={styles.ticket}>
        <div className={styles.shine} aria-hidden />
        <div className={styles.stripe} aria-hidden />

        <div className={styles.top}>
          <div className={styles.stamp}>
            {TICKET.stamp[0]}
            <br />
            {TICKET.stamp[1]}
          </div>

          <div className={`${styles.label} ${styles.revealLabel}`}>{TICKET.label}</div>

          <div className={`${styles.route} ${styles.revealRoute}`}>
            <div className={`${styles.point} ${styles.from}`}>
              <div className={styles.k}>{TICKET.from.k}</div>
              <div className={styles.v}>{TICKET.from.v}</div>
            </div>

            <div className={styles.line} aria-hidden>
              <span className={styles.plane}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M22 12L2 4l4.5 8L2 20z" />
                </svg>
              </span>
            </div>

            <div className={`${styles.point} ${styles.to}`}>
              <div className={styles.k}>{TICKET.to.k}</div>
              <div className={styles.v}>{TICKET.to.v}</div>
            </div>
          </div>

          <div className={`${styles.details} ${styles.revealDetails}`}>
            {TICKET.details.map((detail) => (
              <div key={detail.k}>
                <div className={styles.k}>{detail.k}</div>
                <div className={styles.v}>{detail.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.perforation} />

        <div className={`${styles.bottom} ${styles.revealBottom}`}>
          <div className={styles.barcode} aria-hidden>
            {Array.from({ length: BARRAS }, (_, indice) => (
              <span key={indice} />
            ))}
          </div>
          <div className={styles.ref}>{TICKET.ref}</div>
          <a href={CTA_HREF} className={styles.btn}>
            {TICKET.action}
          </a>
        </div>
      </div>
    </div>
  );
}
