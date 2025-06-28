import Link from "next/link";
import css from "./Home.module.css";

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <div style={{ textAlign: 'center' }}>
        <Link href="/" className={css.link} aria-label="Navigate back to home page">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
