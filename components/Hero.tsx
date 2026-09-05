import { PRIMARY_CTA_HREF } from "@/lib/content";
import { IconArrowRight, IconShield, IconSparkle, IconStar } from "./Icons";
import { HeroIllustration } from "./Illustrations";
import styles from "./Hero.module.css";

/* Iniciais de uma letra: a pilha sobreposta esconde parte de cada círculo. */
const AVATARS = ["C", "R", "L"];

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="hero-titulo">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>
            <IconSparkle width={16} height={16} />
            Aulas ao vivo com professores nativos
          </p>

          <h1 id="hero-titulo" className={styles.title}>
            Fale inglês com <em>confiança</em> em 90 dias
          </h1>

          <p className={styles.lead}>
            Aulas práticas, focadas em conversação real — sem gramática decorada, sem enrolação.
          </p>

          <div className={styles.actions}>
            <a className="btn btn--primary" href={PRIMARY_CTA_HREF}>
              Quero minha aula grátis
              <IconArrowRight className="btnArrow" width={20} height={20} />
            </a>
            <a className="btn btn--secondary" href="#metodologia">
              Ver a metodologia
            </a>
          </div>

          <p className={styles.microcopy}>
            <IconShield width={18} height={18} />
            Aula experimental de 30 minutos. Sem cartão de crédito.
          </p>

          <div className={styles.proof}>
            <div className={styles.avatars} aria-hidden>
              {AVATARS.map((letter) => (
                <span key={letter} className={styles.avatar}>
                  {letter}
                </span>
              ))}
            </div>
            <p className={styles.proofText}>
              <span className={styles.stars} aria-hidden>
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
                <IconStar />
              </span>
              <span>
                <strong>4,9 de 5</strong> em 380 avaliações · +2.400 alunos
              </span>
            </p>
          </div>
        </div>

        <div className={styles.art}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
