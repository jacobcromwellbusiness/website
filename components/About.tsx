'use client';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.index}>03 / ABOUT</div>
          <h2 className={styles.heading}>ABOUT<br />JACOB</h2>
        </div>
        
        <div className={styles.rightColumn}>
          <p className={styles.bio}>
            I am a hands-on builder focused on turning ideas into working digital experiences. I connect marketing, automation, and sales systems to create smooth, reliable click-to-cash journeys.
          </p>
          
          <div className={styles.toolsList}>
            <h3 className={styles.subheading}>TOOLS & PLATFORMS</h3>
            <div className={styles.pills}>
              <span className="pill">Make.com</span>
              <span className="pill">n8n</span>
              <span className="pill">Canva</span>
              <span className="pill">GoHighLevel</span>
              <span className="pill">AI Workflows</span>
            </div>
          </div>
          
          <div className={styles.focusLine}>
            <h3 className={styles.subheading}>CURRENT FOCUS</h3>
            <p>Building automated systems that remove bottlenecks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
