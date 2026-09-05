import { BENEFITS } from "@/lib/content";
import { BENEFIT_ICONS } from "./Icons";
import Reveal from "./Reveal";
import styles from "./Benefits.module.css";

export default function Benefits() {
  return (
    <section id="beneficios" className={`section ${styles.section}`} aria-labelledby="beneficios-titulo">
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Por que a Talkwise</p>
          <h2 id="beneficios-titulo">Tudo o que faltava para você destravar o inglês</h2>
          <p>
            Três compromissos que sustentam o método e explicam por que 92% dos alunos chegam ao
            final dos 90 dias.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {BENEFITS.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[benefit.icon];
            return (
              <Reveal as="li" key={benefit.title} delay={index * 90}>
                <article className={styles.card}>
                  <span className={styles.index} aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.iconWrap}>
                    <Icon width={28} height={28} />
                  </span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
