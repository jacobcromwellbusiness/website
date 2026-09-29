'use client';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wordmark}>JACOB CROMWELL</div>
          <div className={styles.details}>
            <span>&copy; {currentYear}</span>
            <span className={styles.separator}>&mdash;</span>
            <span>Built with intent</span>
          </div>
        </div>
        
        <div className={styles.right}>
          <a href="#top" onClick={scrollToTop} className={styles.backToTop}>
            BACK TO TOP
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
