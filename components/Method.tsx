import { METHOD_STEPS, PRIMARY_CTA_HREF } from "@/lib/content";
import { IconArrowRight, STEP_ICONS } from "./Icons";
import Reveal from "./Reveal";
import styles from "./Method.module.css";

export default function Method() {
  return (
    <section
      id="metodologia"
      className={`section onDark ${styles.section}`}
      aria-labelledby="metodologia-titulo"
    >
      <div className="container">
        <Reveal className={`sectionHead ${styles.head}`}>
          <p className="eyebrow">Metodologia Talkwise</p>
          <h2 id="metodologia-titulo">Quatro etapas do primeiro “hello” à certificação</h2>
          <p>
            Nada de trilha genérica: cada etapa tem entregas claras, e você sabe exatamente onde
            está em cada semana do programa.
          </p>
        </Reveal>

        <ol className={styles.steps}>
          {METHOD_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.icon];
            return (
              <Reveal as="li" key={step.number} className={styles.step} delay={index * 90}>
                <span className={styles.badge} aria-hidden>
                  {step.number}
                </span>
                <div className={styles.content}>
                  <p className={styles.meta}>
                    <Icon width={16} height={16} />
                    {step.duration}
                  </p>
                  <h3>
                    <span className="srOnly">Etapa {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className={styles.footer}>
          <p className={styles.footerNote}>
            A primeira etapa é gratuita: agende o diagnóstico e receba um mapa do seu nível por
            escrito.
          </p>
          <a className="btn btn--primary" href={PRIMARY_CTA_HREF}>
            Começar pelo diagnóstico
            <IconArrowRight className="btnArrow" width={20} height={20} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
