import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const TAGS = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarDefault() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navigation}>
        <h2 className={styles.title}>Filter by tags</h2>
        <ul className={styles.tagList}>
          {TAGS.map((tag) => (
            <li key={tag} className={styles.tagItem}>
              <Link href={`/notes/filter/${tag}`} className={styles.tagLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 