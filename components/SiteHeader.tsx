'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './SiteHeader.module.css';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.wordmark} onClick={closeMenu}>
          JACOB CROMWELL
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <Link href="#work" className={styles.navLink}>Work</Link>
          <Link href="#capabilities" className={styles.navLink}>Capabilities</Link>
          <Link href="#about" className={styles.navLink}>About</Link>
        </nav>
        
        <div className={styles.contactDesktop}>
          <Link href="#contact" className="pill">Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link href="#work" className={styles.mobileNavLink} onClick={closeMenu}>Work</Link>
            <Link href="#capabilities" className={styles.mobileNavLink} onClick={closeMenu}>Capabilities</Link>
            <Link href="#about" className={styles.mobileNavLink} onClick={closeMenu}>About</Link>
            <Link href="#contact" className={styles.mobileNavLink} onClick={closeMenu}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
