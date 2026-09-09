import BrandLogo from "./BrandLogo";
import styles from "./Footer.module.css";

const ANO = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footShell}>
        <div className={styles.brand}>
          <BrandLogo className={styles.logo} height={42} />
        </div>
        <p>© {ANO} Talkwise English. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
