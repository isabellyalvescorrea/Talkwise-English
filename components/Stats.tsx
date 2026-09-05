import { STATS } from "@/lib/content";
import styles from "./Stats.module.css";

export default function Stats() {
  return (
    <section aria-label="Como funcionam as turmas" className={styles.band}>
      <ul className={`shell shell--flush ${styles.stats}`}>
        {STATS.map((stat) => (
          <li key={stat.label} className={styles.stat}>
            <span className={styles.num}>{stat.num}</span>
            <span className={styles.label}>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
