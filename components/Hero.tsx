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
  const collageColumnRef = useRef<HTMLDivElement>(null);

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
      gsap.set('.hero-text-anim', { opacity: 0, y: 100 });
      gsap.set('.hero-image-anim', { opacity: 0, y: 100 });
      
      const handleStart = () => {
        gsap.to('.hero-text-anim', {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          clearProps: 'all'
        });

        const imageEls = gsap.utils.toArray('.hero-image-anim') as HTMLElement[];
        imageEls.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        
        gsap.to(imageEls, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          clearProps: 'all'
        });
      };
      
      window.addEventListener('loaderFinished', handleStart);

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(col1Ref.current, {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });

        gsap.to(col2Ref.current, {
          y: -300,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
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
      <div className={styles.heroContainer}>
        <div className={styles.textColumn}>
          <div className={styles.stickyContent}>
            <p className={`${styles.eyebrow} hero-text-anim`}>HIGH EFFICIENCY WORKFLOWS / MARKETING / SALES SYSTEMS</p>
            <h1 className={`${styles.headline} hero-text-anim`}>
              <span className={styles.staticLine}>I BUILD SYSTEMS THAT</span>
              <span className={styles.rotatingContainer}>
                {phrases.map((phrase, i) => {
                  let statusClass = styles.nextWord;
                  if (i === index) statusClass = styles.activeWord;
                  else if (i === (index - 1 + phrases.length) % phrases.length) statusClass = styles.prevWord;

                  return (
                    <span 
                      key={phrase} 
                      className={`${styles.rotatingWord} ${statusClass}`}
                      aria-hidden={i !== index}
                    >
                      {phrase}.
                    </span>
                  );
                })}
                {/* Invisible spacer to maintain width */}
                <span className={styles.spacer}>AUTOMATE.</span>
              </span>
            </h1>
            <p className={`${styles.support} hero-text-anim`}>
              Connecting ideas, tools, and customer journeys into working systems.
            </p>
            <div className={`${styles.downCue} hero-text-anim`}>
              <span>Selected work</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5V19M12 19L5 12M12 19L19 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.collageColumn} ref={collageColumnRef}>
          <div className={styles.collageWrapper}>
            <div className={`${styles.collageCol} ${styles.col1}`} ref={col1Ref}>
              {[1, 4, 6, 8, 10].map((num) => (
                <div key={num} className={`${styles.imageWrapper} hero-image-anim`}>
                  <Image src={`/images/image_${num}.webp`} alt={`Project ${num}`} width={600} height={800} className={styles.collageImage} priority={num < 5} />
                </div>
              ))}
            </div>
            
            <div className={`${styles.collageCol} ${styles.col2}`} ref={col2Ref}>
              {[3, 5, 7, 9].map((num) => (
                <div key={num} className={`${styles.imageWrapper} hero-image-anim`}>
                  <Image src={`/images/image_${num}.webp`} alt={`Project ${num}`} width={600} height={800} className={styles.collageImage} priority={num < 5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
