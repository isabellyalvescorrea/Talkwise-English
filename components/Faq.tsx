import { FAQS } from "@/lib/content";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section id="duvidas" className="section on-white" aria-labelledby="duvidas-titulo">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Dúvidas</p>
          <h2 id="duvidas-titulo">Antes de reservar sua vaga.</h2>
        </div>

        <div className={styles.list}>
          {FAQS.map((faq) => (
            <details key={faq.q} className={styles.item}>
              <summary className={styles.summary}>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
