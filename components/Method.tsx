import { STEPS } from "@/lib/content";
import styles from "./Method.module.css";

export default function Method() {
  return (
    <section id="metodo" className="section on-pastel" aria-labelledby="metodo-titulo">
      <div className="shell">
        <div className="section-head">
          <h2 id="metodo-titulo">Quatro etapas, sem atalhos e sem enrolação.</h2>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.n} className={styles.step} data-revelar>
              <span className={styles.n} aria-hidden>
                {step.n}
              </span>
              <div className={styles.conteudo}>
                <h3>
                  <span className="sr-only">Etapa {step.n}: </span>
                  {step.title}
                </h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
