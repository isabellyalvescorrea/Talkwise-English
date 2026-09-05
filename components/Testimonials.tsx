import { TESTIMONIALS } from "@/lib/content";
import { IconQuote, IconStar } from "./Icons";
import Reveal from "./Reveal";
import styles from "./Testimonials.module.css";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className={`section ${styles.section}`}
      aria-labelledby="depoimentos-titulo"
    >
      <div className="container">
        <Reveal className="sectionHead">
          <p className="eyebrow">Depoimentos</p>
          <h2 id="depoimentos-titulo">Quem destravou o inglês na Talkwise</h2>
          <p>
            Histórias de alunos que passaram do “entendo, mas não falo” para conversas de verdade —
            no trabalho, na viagem e na entrevista.
          </p>
        </Reveal>

        <div className={styles.masonry}>
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} className={styles.item} delay={(index % 3) * 90}>
              <figure className={styles.card}>
                <IconQuote className={styles.quoteMark} />
                <span className={styles.stars} aria-label="Avaliação: 5 de 5 estrelas">
                  <IconStar aria-hidden />
                  <IconStar aria-hidden />
                  <IconStar aria-hidden />
                  <IconStar aria-hidden />
                  <IconStar aria-hidden />
                </span>
                <blockquote className={styles.quote}>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className={styles.person}>
                  <span className={styles.avatar} aria-hidden>
                    {initials(testimonial.name)}
                  </span>
                  <span>
                    <span className={styles.name}>{testimonial.name}</span>
                    <span className={styles.since}>{testimonial.since}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
