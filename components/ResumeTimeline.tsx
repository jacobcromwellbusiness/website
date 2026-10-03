'use client';
import React, { useEffect, useRef } from 'react';
import styles from './ResumeTimeline.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EXPERIENCES = [
  {
    id: 1,
    company: "Wyndham Hotels & Resorts",
    role: "Reservations Team Lead",
    date: "August 2016 - November 2018",
    highlight: "Where I learned leadership, team management, and how to consistently hit core KPIs while supporting a high-volume team.",
  },
  {
    id: 2,
    company: "Synoptek",
    role: "Support Engineer",
    date: "June 2019 - December 2022",
    highlight: "Where I built my technical foundation—learning core troubleshooting, CS fundamentals, and how to deliver enterprise-grade support.",
  },
  {
    id: 3,
    company: "Absorb Software",
    role: "Technical Specialist",
    date: "December 2022 - November 2025",
    highlight: "Where I dove deep into software integration, RESTful APIs, SSO implementations, and managing complex enterprise software projects.",
  },
  {
    id: 4,
    company: "Atlantic Digital Safety",
    role: "Safety System Architect",
    date: "December 2025 - Present",
    highlight: "Where I currently orchestrate digital workflows, automate processes, and ensure bulletproof compliance infrastructure.",
  },
  {
    id: 5,
    company: "Independent Freelancer",
    role: "Web & System Developer",
    date: "2023 - Present",
    highlight: "Where I've been designing custom websites, building scalable CRMs, and orchestrating automated workflows for various businesses.",
  }
];

export default function ResumeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate the center line growing as you scroll
      gsap.to(lineProgressRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      });

      // Animate each timeline item
      const items = gsap.utils.toArray(`.${styles.timelineItem}`);
      
      items.forEach((item: any, i) => {
        const content = item.querySelector(`.${styles.content}`);
        const node = item.querySelector(`.${styles.node}`);
        const connector = item.querySelector(`.${styles.connector}`);

        const textElements = item.querySelectorAll(`.${styles.date}, .${styles.company}, .${styles.role}, .${styles.highlight}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Slide in the whole card
        tl.fromTo(content,
          { y: 60, opacity: 0, rotationX: 15, scale: 0.95, transformPerspective: 1000 },
          { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1.0, ease: "power4.out" }
        );

        // Animate the gradient connector line
        if (connector) {
          tl.fromTo(connector,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.6"
          );
        }

        // Stagger the text inside the card for a richer effect
        tl.fromTo(textElements,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        );

        // Light up node when scrolled past
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          onEnter: () => node?.classList.add(styles.active),
          onLeaveBack: () => node?.classList.remove(styles.active),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Journey So Far</h2>
          <p className={styles.subtitle}>A map of where I've built my foundation and expertise.</p>
        </div>

        <div className={styles.timeline}>
          {/* Vertical Line */}
          <div className={styles.timelineLine} ref={lineRef}>
            <div className={styles.timelineProgress} ref={lineProgressRef}></div>
          </div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className={styles.timelineItem}>
              <div className={styles.node}></div>
              <div className={styles.content}>
                <div className={styles.connector}></div>
                <div className={styles.date}>{exp.date}</div>
                <h3 className={styles.company}>{exp.company}</h3>
                <h4 className={styles.role}>{exp.role}</h4>
                <p className={styles.highlight}>{exp.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaWrapper}>
          <a href="#case-studies" className={styles.ctaButton}>
            See Real Work I've Done
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
