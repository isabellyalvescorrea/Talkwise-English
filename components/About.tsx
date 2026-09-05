import { STATS, TEACHERS } from "@/lib/content";
import { IconGlobe, IconShield } from "./Icons";
import { DottedGlobe } from "./Illustrations";
import Reveal from "./Reveal";
import styles from "./About.module.css";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function About() {
  return (
    <section id="sobre" className={`section ${styles.section}`} aria-labelledby="sobre-titulo">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <p className="eyebrow">Sobre nós</p>
          <h2 id="sobre-titulo">Uma escola criada por quem já esteve travado</h2>
          <p>
            A Talkwise nasceu em 2019, fundada por três professoras e professores brasileiros
            formados em Dublin, Toronto e Manchester — gente cansada de ver aluno com anos de curso
            emudecer na primeira conversa de verdade.
          </p>
          <p>
            O método foi validado em sala antes de virar programa: <strong>2.400 alunos</strong>{" "}
            depois, a promessa continua a mesma — você fala desde a primeira aula, com correção na
            hora e um professor que conhece o seu objetivo pelo nome.
          </p>

          <dl className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className="srOnly">{stat.label}</dt>
                <dd>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel} aria-hidden>
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className={styles.people} delay={120}>
          <DottedGlobe className={styles.globe} />
          <p className={styles.peopleHead}>Alguns dos nossos professores</p>

          {TEACHERS.map((teacher) => (
            <article key={teacher.name} className={styles.person}>
              <span className={styles.personAvatar} aria-hidden>
                {initials(teacher.name)}
              </span>
              <span className={styles.personInfo}>
                <span className={styles.personName}>{teacher.name}</span>
                <span className={styles.personSpecialty}>{teacher.specialty}</span>
                <span className={styles.personOrigin}>
                  <IconGlobe width={14} height={14} />
                  {teacher.origin}
                </span>
              </span>
            </article>
          ))}

          <p className={styles.note}>
            <IconShield width={18} height={18} />
            Todo professor passa por certificação interna e avaliação contínua dos alunos. Abaixo de
            4,7 estrelas, sai da grade.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
