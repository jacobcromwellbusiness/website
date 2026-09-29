'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

const phrases = ['ATTRACT', 'AUTOMATE', 'CLOSE'];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleVisibilityChange = () => {
      if (document.hidden) return;
    };
    
    let interval = setInterval(() => {
      if (!document.hidden && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIndex((prev) => (prev + 1) % phrases.length);
      }
    }, 2600);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    let ctx = gsap.context(() => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(col1Ref.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
        
        gsap.to(col2Ref.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      ctx.revert();
    };
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <div className={styles.stickyContent}>
            <p className={styles.eyebrow}>AI WORKFLOWS / MARKETING / SALES SYSTEMS</p>
            <h1 className={styles.headline}>
              I BUILD SYSTEMS THAT
              <span className={styles.rotatingContainer}>
                {phrases.map((phrase, i) => (
                  <span 
                    key={phrase} 
                    className={`${styles.rotatingWord} ${i === index ? styles.activeWord : styles.inactiveWord}`}
                    aria-hidden={i !== index}
                  >
                    {phrase}.
                  </span>
                ))}
                {/* Invisible spacer to maintain width */}
                <span className={styles.spacer}>AUTOMATE.</span>
              </span>
            </h1>
            <p className={styles.support}>
              Connecting ideas, tools, and customer journeys into working systems.
            </p>
            <div className={styles.downCue}>
              <span>Selected work</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.collageColumn}>
          <div className={styles.collageWrapper}>
            <div className={`${styles.collageCol} ${styles.col1}`} ref={col1Ref}>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_1.jpg" alt="System automation" width={600} height={800} className={styles.collageImage} priority />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_2.jpg" alt="Results" width={600} height={800} className={styles.collageImage} priority />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_1.jpg" alt="System automation" width={600} height={800} className={styles.collageImage} />
              </div>
            </div>
            
            <div className={`${styles.collageCol} ${styles.col2}`} ref={col2Ref}>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_3.jpg" alt="Handshake deal" width={600} height={800} className={styles.collageImage} priority />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_4.jpg" alt="Building structure" width={600} height={800} className={styles.collageImage} priority />
              </div>
              <div className={styles.imageWrapper}>
                <Image src="/images/image_3.jpg" alt="Handshake deal" width={600} height={800} className={styles.collageImage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
