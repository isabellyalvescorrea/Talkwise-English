import { TESTIMONIALS } from "@/lib/content";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="alunos" className="section on-pastel" aria-labelledby="alunos-titulo">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Alunos</p>
          <h2 id="alunos-titulo">Quem já embarcou.</h2>
        </div>

        <div className={styles.postcards}>
          {TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.meta} className={styles.postcard}>
              <span className={styles.stamp} aria-hidden>
                TW
              </span>
              <blockquote className={styles.quote}>
                <p>{testimonial.quote}</p>
              </blockquote>
              <figcaption className={styles.meta}>{testimonial.meta}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
