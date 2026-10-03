'use client';
import styles from './NonProfitWork.module.css';

import AnimatedCat from './AnimatedCat';

export default function NonProfitWork() {
  return (
    <section id="non-profit" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h2 className={styles.heading}>NON-PROFIT<br />CONTRIBUTIONS</h2>
          <AnimatedCat />
        </div>
        
        <div className={styles.rightColumn}>
          <p className={styles.bio}>
            Beyond commercial work, I firmly believe in using my skills to give back to the community and support causes that matter. 
            Recently, I dedicated my time to empowering a local cat rescue shelter, Latimore Lake Cats.
          </p>
          
          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureTitle}>Digital Presence</div>
              <p className={styles.featureText}>
                Designed and developed a fully functional, user-friendly website to help establish their online footprint and drive more awareness to her clinics.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureTitle}>Automated Workflows</div>
              <p className={styles.featureText}>
                Engineered custom automations that trigger real-time notifications for critical events, ensuring the clinic's staff never miss an important update.
              </p>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureTitle}>Audience Engagement</div>
              <p className={styles.featureText}>
                Implemented robust lead-capture systems to collect emails and seamlessly sync them into a centralized mailing list for ongoing community outreach.
              </p>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureTitle}>Traffic & Growth</div>
              <p className={styles.featureText}>
                Set up the infrastructure and SEO fundamentals necessary to sustainably drive organic traffic straight to her clinics, maximizing their community impact.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.jumpingBoxContainer}>
        <div className={styles.jumpingBox} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Keep scrolling if you want to arrange a call or discuss your project more
        </div>
      </div>
    </section>
  );
}
