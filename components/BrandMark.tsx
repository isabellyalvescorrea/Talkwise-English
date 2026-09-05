import styles from "./BrandMark.module.css";

/**
 * Quadrado com degradê camel e o chevron vazado do protótipo.
 * O chevron é desenhado com bordas rotacionadas, como no arquivo original.
 */
export default function BrandMark() {
  return <span className={styles.mark} aria-hidden />;
}
