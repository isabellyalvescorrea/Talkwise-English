import { BENEFITS } from "@/lib/content";
import styles from "./Benefits.module.css";

export default function Benefits() {
  return (
    <section id="vantagens" className="section on-white" aria-labelledby="vantagens-titulo">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Vantagens</p>
          <h2 id="vantagens-titulo">Por que falar inglês muda o jogo.</h2>
        </div>

        <ul className={styles.benefits}>
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className={styles.benefit}>
              <span className={styles.mark} aria-hidden />
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
