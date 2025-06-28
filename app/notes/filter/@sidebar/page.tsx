import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const TAG_ICONS = {
  "All notes": "📝",
  "Todo": "✅",
  "Work": "💼",
  "Personal": "👤",
  "Meeting": "🤝",
  "Shopping": "🛒"
};

export default function SidebarNotes() {
  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.title}>Filter by Tags</h2>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/notes/filter/All" className={styles.menuLink}>
            <span className={styles.icon}>📝</span>
            All notes
          </Link>
        </li>
        {TAGS.map((tag) => (
          <li key={tag} className={styles.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={styles.menuLink}
            >
              <span className={styles.icon}>{TAG_ICONS[tag as keyof typeof TAG_ICONS]}</span>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
