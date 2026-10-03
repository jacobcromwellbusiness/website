'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './CaseStudies.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function CaseStudies() {
  const [plumberOpen, setPlumberOpen] = useState(false);
  const [advisorOpen, setAdvisorOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation (smooth fade up)
      gsap.from(`.${styles.mainTitle}`, {
        scrollTrigger: {
          trigger: `.${styles.mainTitle}`,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });

      // Subtitle fade in (since it has links and breaks, a smooth fade up is better)
      gsap.from(`.${styles.mainSubtitle}`, {
        scrollTrigger: {
          trigger: `.${styles.mainSubtitle}`,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      });



      // Case study cards floating in
      gsap.utils.toArray(`.${styles.caseStudy}`).forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
          y: 60,
          opacity: 0,
          scale: 0.97,
          duration: 1.2,
          ease: 'power4.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section className={styles.section} id="case-studies" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.mainHeader}>

          <h2 className={styles.mainTitle}>Snapshots Of Real Work I've Done</h2>
          <div className={styles.mainSubtitle}>
            <a href="#interactive-prototypes" className={styles.prototypeLink}>
              Skip directly to Interactive Website Prototypes
            </a>
          </div>
        </div>



        {/* Plumber Case Study */}
        <div className={styles.caseStudy}>
          <div className={styles.studyHeader}>
            <h3 className={styles.studyTitle}>Plumber Lead Capture System</h3>
            <p className={styles.studyDesc}>
              Digital Infrastructure for Plumbers. A fully automated system designed to capture emergency calls reliably and ensure you get paid faster. Featuring a custom funnel integrated directly with backend CRM operations.
            </p>
            
            <button className={styles.readMoreBtn} onClick={() => setPlumberOpen(!plumberOpen)}>
              {plumberOpen ? '- Read Less' : '+ Read More'}
            </button>
            <div className={`${styles.collapsibleContent} ${plumberOpen ? styles.open : ''}`}>
              <div className={styles.collapsibleInner}>
                <h4>The Bottleneck</h4>
                <p>Plumbing businesses put in the work to get visible, but their tech stacks are often a mess. When someone actually reaches out, inquiries sit in an inbox. Data is scattered across different apps that don't talk to each other, resulting in missed emergency calls and lost revenue.</p>
                <h4>The Solution</h4>
                <p>We built the full ecosystem. A high-converting custom web funnel captures leads, while backend automations map the data seamlessly into a streamlined GoHighLevel pipeline. Automated reminders, no-show recovery, and custom integrations handle the heavy lifting so the business runs smoothly without manual intervention.</p>
              </div>
            </div>
          </div>
          <div className={styles.mediaGrid}>
            <div className={`${styles.videoWrapper} ${styles.desktopVideo}`}>
              <iframe 
                src="https://www.youtube.com/embed/wESQH8q8zAM?autoplay=0&rel=0&modestbranding=1" 
                title="Plumber System Desktop" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className={`${styles.videoWrapper} ${styles.mobileVideo}`}>
              <iframe 
                src="https://www.youtube.com/embed/a8A-YC9CEXI?autoplay=0&rel=0&modestbranding=1" 
                title="Plumber System Mobile" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Podcast Case Study */}
        <div className={styles.caseStudy}>
          <div className={styles.studyHeader}>
            <h3 className={styles.studyTitle}>Strategic Advisor Lead System</h3>
            <p className={styles.studyDesc}>
              A fully automated lead system built for Pinnacle Strategic Advisors. The build encompasses custom web design, workflow automation, and seamless data integration. Completely documented and handed over.
            </p>
            
            <button className={styles.readMoreBtn} onClick={() => setAdvisorOpen(!advisorOpen)}>
              {advisorOpen ? '- Read Less' : '+ Read More'}
            </button>
            <div className={`${styles.collapsibleContent} ${advisorOpen ? styles.open : ''}`}>
              <div className={styles.collapsibleInner}>
                <h4>The Bottleneck</h4>
                <p>Despite inbound interest from a popular podcast, the digital infrastructure to capture, qualify, and book those leads efficiently was missing. Inquiries came through DMs, data was managed manually, and the front-end looked great but the back-end IT was bleeding time and money.</p>
                <h4>The Solution</h4>
                <p>A complete data migration moving scattered tools into one centralized CRM. We implemented an AI-driven booking engine with automated reminders and no-show recovery sequences. With full pipeline setup, tagging, and logic mapping, operations now run flawlessly without manual data entry.</p>
              </div>
            </div>
          </div>
          <div className={styles.mediaGrid}>
            <div className={`${styles.videoWrapper} ${styles.standardVideo}`}>
              <video 
                controls 
                preload="metadata" 
                poster=""
              >
                <source src="https://assets.cdn.filesafe.space/lUUMAyxlGVkuN99nhYoO/media/69bd40a24865cd676939966d.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
