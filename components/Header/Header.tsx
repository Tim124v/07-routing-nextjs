"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";

const Modal = dynamic(() => import("../Modal/Modal"), { ssr: false });
const Dashboard = dynamic(() => import("../Dashboard/Dashboard"), { ssr: false });

const Header = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>Home</Link>
          </li>
          <li className={css.navigationItem}>
            <button 
              onClick={() => setIsDashboardOpen(true)}
              className={css.dashboardBtn}
              title="Open Statistics"
            >
              📊 Dashboard
            </button>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
      </nav>

      {isDashboardOpen && (
        <Modal onClose={() => setIsDashboardOpen(false)}>
          <Dashboard onClose={() => setIsDashboardOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
