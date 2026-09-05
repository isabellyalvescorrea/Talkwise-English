import { NAV_LINKS, PRIMARY_CTA_HREF } from "@/lib/content";
import { IconArrowRight } from "./Icons";
import { LogoMark } from "./Illustrations";
import styles from "./Footer.module.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <a className={styles.logo} href="#inicio" aria-label="Talkwise English — ir para o início">
            <LogoMark size={40} />
            <span className={styles.logoText}>
              Talkwise <span>English</span>
            </span>
          </a>
          <p className={styles.tagline}>
            Escola online de inglês com foco em conversação. Aulas ao vivo, professores nativos e um
            programa de 90 dias desenhado para você falar desde a primeira semana.
          </p>
        </div>

        <div className={styles.columns}>
          <nav aria-label="Navegação do rodapé">
            <h2 className={styles.colTitle}>Navegação</h2>
            <ul className={styles.links}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a className={styles.link} href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a className={styles.link} href={PRIMARY_CTA_HREF}>
                  Aula grátis
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Contato</h2>
            <div className={styles.contact}>
              <p>
                <a href="mailto:contato@talkwiseenglish.com.br">contato@talkwiseenglish.com.br</a>
              </p>
              <p>Atendimento de segunda a sexta, das 8h às 20h (horário de Brasília).</p>
              <p>Aulas 100% online, para alunos de qualquer lugar do Brasil.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {YEAR} Talkwise English. Todos os direitos reservados.</p>
        <a className={styles.toTop} href="#inicio">
          Voltar ao topo
          <IconArrowRight width={16} height={16} />
        </a>
      </div>
    </footer>
  );
}
