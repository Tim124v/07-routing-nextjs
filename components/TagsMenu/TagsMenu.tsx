"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./TagsMenu.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link 
              href="/notes/filter/All" 
              className={styles.menuLink}
              onClick={handleLinkClick}
            >
              All notes
            </Link>
          </li>
          {TAGS.map((tag) => (
            <li key={tag} className={styles.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={styles.menuLink}
                onClick={handleLinkClick}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
