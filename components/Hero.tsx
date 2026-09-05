import { CTA_HREF } from "@/lib/content";
import BoardingPass from "./BoardingPass";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <header id="topo" className={styles.hero}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Talkwise English</p>

          <h1 className={styles.title}>
            Fale <span className={styles.grey}>inglês</span> com{" "}
            <span className={styles.emph}>confiança</span>.
            <br />
            Viva novas <span className={styles.grey}>possibilidades</span>.
          </h1>

          <p className={styles.lede}>
            Aulas ao vivo, em grupos pequenos, com professores nativos. Você pratica desde o
            primeiro encontro, sem promessas de fluência instantânea.
          </p>

          <div className={styles.ctas}>
            <a href={CTA_HREF} className="btn-primary">
              Reservar minha aula grátis
            </a>
            <a href="#metodo" className="btn-secondary">
              Ver a metodologia
            </a>
          </div>

          <p className={styles.finePrint}>
            ✓ Aula experimental de 30 minutos, sem cartão de crédito.
          </p>
        </div>

        <div className={styles.ticketSide}>
          <BoardingPass />
        </div>
      </div>
    </header>
  );
}
