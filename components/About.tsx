'use client';
import Image from 'next/image';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <h2 className={styles.heading}>ABOUT<br />JACOB</h2>
          <div className={styles.imageWrapper}>
            <Image 
              src="/images/profilepic.webp" 
              alt="Jacob Cromwell" 
              width={400} 
              height={400} 
              className={styles.profileImage} 
            />
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <p className={styles.bio}>
            I am a hands-on builder focused on turning ideas into working digital experiences. I connect marketing, automation, and sales systems to create smooth, reliable click-to-cash journeys.
          </p>
          
          <div className={styles.personalInfo}>
            <h3 className={styles.subheading}>BEYOND THE DESK</h3>
            <p className={styles.bioText}>
              I'm from a small town in New Brunswick, Canada, and above all, I am a family-first man with two wonderful kids who I am incredibly proud of.
              <br /><br />
              I genuinely love the world of business, and in my downtime, you'll often find me diving into insights from creators like Alex Hormozi and Gary Vaynerchuk.
            </p>
          </div>

          <div className={styles.toolsList}>
            <h3 className={styles.subheading}>TOOLS & PLATFORMS</h3>
            <div className={styles.pills}>
              <span className="pill">Make.com</span>
              <span className="pill">n8n</span>
              <span className="pill">Canva</span>
              <span className="pill">GoHighLevel</span>
              <span className="pill">High Efficiency Workflows</span>
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
