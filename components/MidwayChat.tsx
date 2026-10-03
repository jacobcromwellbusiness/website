'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './MidwayChat.module.css';

export default function MidwayChat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const picRef = useRef<HTMLImageElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      });

      tl.fromTo(picRef.current, 
        { scale: 0, opacity: 0, rotation: -15 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)" }
      )
      .fromTo(bubbleRef.current, 
        { scale: 0.8, opacity: 0, x: -20 },
        { scale: 1, opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.2)" }, 
        "-=0.4"
      )
      .fromTo(`.${styles.choiceBtn}`, 
        { scale: 0.8, y: 10, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.2)" }, 
        "-=0.2"
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToDemos = () => {
    const el = document.getElementById('interactive-prototypes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.introDialogContainer}>
        <Image 
          ref={picRef}
          src="/images/profile_picture-removebg.webp" 
          alt="Jacob Cromwell" 
          width={96} 
          height={96} 
          className={styles.profilePic}
        />
        <div className={styles.dialogBox} ref={bubbleRef}>
          <p className={styles.dialogText}>
            Are you ready to book a call?
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup} ref={buttonsRef}>
        <button 
          className={`${styles.choiceBtn} ${styles.clickable}`} 
          onClick={handleScrollToContact}
        >
          Yes, let's schedule a time
        </button>
        <button 
          className={`${styles.choiceBtn} ${styles.clickable}`} 
          onClick={handleScrollToDemos}
        >
          No, I'll keep scrolling to check out your web design
        </button>
      </div>
    </div>
  );
}
