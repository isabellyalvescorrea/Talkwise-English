import { TEACHERS } from "@/lib/content";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="sobre" className="section on-white" aria-labelledby="sobre-titulo">
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Sobre</p>
          <h2 className="sr-only" id="sobre-titulo">
            Sobre a Talkwise
          </h2>
          <p className={styles.text}>
            A Talkwise nasceu de uma frustração comum: anos de inglês na escola, e ainda assim, o
            silêncio na hora de puxar uma conversa de verdade.
          </p>
          <p className={styles.text}>
            Reunimos professores nativos que já passaram por isso em outro idioma, e construímos um
            método em que você fala desde a primeira semana, não depois de decorar tempos verbais.
          </p>
        </div>

        <ul className={styles.teachers}>
          {TEACHERS.map((teacher) => (
            <li key={teacher.name} className={styles.teacher}>
              <span>
                <span className={styles.name}>{teacher.name}</span>
                <span className={styles.from}>{teacher.from}</span>
              </span>
              <span className={styles.spec}>{teacher.spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
