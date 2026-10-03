'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from './ContactPanel.module.css';

export default function ContactPanel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [calendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Calendly sends window messages starting with "calendly."
      if (e.data && typeof e.data === 'object' && e.data.event && e.data.event.indexOf('calendly') === 0) {
        setCalendarLoaded(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jacobcromwell98@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        
        <div className={styles.textColumn}>
          <h2 className={styles.mainHeading}>Ready to get started?</h2>
          <p className={styles.subtext}>
            Book a call using the calendar, or drop an email directly to my inbox:
          </p>
          <div className={styles.buttonGroup}>
            <a href="mailto:jacobcromwell98@gmail.com" className={styles.emailBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Send Email
            </a>
            <button onClick={handleCopyEmail} className={styles.copyBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
          </div>
        </div>
        
        <div className={`${styles.widgetColumn} ${isVisible ? styles.isVisible : ''}`}>
          <div className={styles.calendlyWrapper}>
            <div className={`${styles.calendarLoader} ${calendarLoaded ? styles.loaded : ''}`}>
              <div className={styles.spinner}></div>
              <span>Loading Calendar...</span>
            </div>
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/jacobcromwell98/consult?hide_gdpr_banner=1" 
              style={{ minWidth: '320px', height: '700px' }}
            ></div>
            <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
          </div>
        </div>

      </div>
    </section>
  );
}
