'use client';
import { useState } from 'react';
import styles from './ContactPanel.module.css';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const email = 'hello@jacobcromwell.com'; // User needs to update this

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>HAVE AN IDEA WORTH CONNECTING?</h2>
        
        <div className={styles.actions}>
          <a href={`mailto:${email}`} className={styles.emailLink}>
            {email}
          </a>
          
          <button 
            onClick={handleCopy} 
            className={styles.copyBtn}
            aria-live="polite"
          >
            {copied ? 'COPIED' : 'COPY EMAIL'}
          </button>
        </div>
      </div>
    </section>
  );
}
