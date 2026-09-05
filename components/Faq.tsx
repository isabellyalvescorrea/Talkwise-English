"use client";

import { useId, useState } from "react";
import { FAQS, SECONDARY_CTA_HREF } from "@/lib/content";
import { IconArrowRight, IconChevronDown, IconSparkle } from "./Icons";
import Reveal from "./Reveal";
import styles from "./Faq.module.css";

export default function Faq() {
  const uid = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className={`section ${styles.section}`} aria-labelledby="duvidas-titulo">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.aside}>
          <p className="eyebrow">Dúvidas Frequentes</p>
          <h2 id="duvidas-titulo">Tudo o que costumam perguntar antes de começar</h2>
          <p>
            Se a sua pergunta não estiver aqui, ela cabe na aula experimental — é o momento certo
            para tirar dúvidas com um professor.
          </p>

          <div className={styles.helper}>
            <p className={styles.helperTitle}>
              <IconSparkle width={18} height={18} />
              Ainda em dúvida?
            </p>
            <p>
              Comece pelo material gratuito. Em 15 minutos de leitura você já sai com frases prontas
              para usar na próxima conversa.
            </p>
            <a className="btn btn--secondary btn--sm" href={SECONDARY_CTA_HREF}>
              Baixar as 100 frases
              <IconArrowRight className="btnArrow" width={18} height={18} />
            </a>
          </div>
        </Reveal>

        <Reveal className={styles.list} delay={120}>
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            const buttonId = `${uid}-pergunta-${index}`;
            const panelId = `${uid}-resposta-${index}`;

            return (
              <div key={faq.question} className={styles.item} data-open={open}>
                <h3 className={styles.itemHeading}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.trigger}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    {faq.question}
                    <span className={styles.chevron} aria-hidden>
                      <IconChevronDown width={18} height={18} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={styles.panel}
                  role="region"
                  aria-labelledby={buttonId}
                >
                  <div className={styles.panelInner}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
