import { CTA_HREF, TICKET } from "@/lib/content";
import styles from "./BoardingPass.module.css";

/* Alturas fixas: um padrão aleatório causaria divergência de hidratação. */
const BARCODE = [
  30, 14, 22, 8, 26, 12, 30, 18, 10, 24, 16, 28, 20, 12, 26, 10, 22, 30, 14, 18, 24, 8, 28, 16, 20,
  12, 30, 22, 10, 26, 14, 24, 18, 8, 28, 20, 12, 30, 16, 22,
];

export default function BoardingPass() {
  return (
    <div className={styles.wrap}>
      <div className={styles.ticket}>
        <div className={styles.top}>
          <div className={styles.label}>{TICKET.label}</div>

          <div className={styles.route}>
            <div className={styles.point}>
              <div className={styles.k}>{TICKET.from.k}</div>
              <div className={styles.v}>{TICKET.from.v}</div>
            </div>
            <div className={styles.line} aria-hidden />
            <div className={styles.point}>
              <div className={styles.k}>{TICKET.to.k}</div>
              <div className={styles.v}>{TICKET.to.v}</div>
            </div>
          </div>

          <div className={styles.details}>
            {TICKET.details.map((detail) => (
              <div key={detail.k}>
                <div className={styles.k}>{detail.k}</div>
                <div className={styles.v}>{detail.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.perforation} />

        <div className={styles.bottom}>
          <div className={styles.barcode} aria-hidden>
            {BARCODE.map((altura, indice) => (
              <span key={indice} style={{ height: `${altura}px` }} />
            ))}
          </div>
          <a href={CTA_HREF} className={styles.btn}>
            {TICKET.action}
          </a>
        </div>
      </div>
    </div>
  );
}
