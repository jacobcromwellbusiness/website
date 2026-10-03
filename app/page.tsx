'use client';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '@/components/Loader';
import Hero from '@/components/Hero';

import About from '@/components/About';
import ResumeTimeline from '@/components/ResumeTimeline';
import NonProfitWork from '@/components/NonProfitWork';
import ContactPanel from '@/components/ContactPanel';

import DemoViewer from '@/components/DemoViewer';
import CaseStudies from '@/components/CaseStudies';
import MidwayChat from '@/components/MidwayChat';

export default function Home() {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const handleFinished = (e: any) => {
      setContentVisible(true);
      if (e.detail?.target) {
        setTimeout(() => {
          if (e.detail.target === 'top') {
            window.scrollTo({ top: 0, behavior: 'instant' });
          } else {
            const el = document.querySelector(e.detail.target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    // @ts-ignore
    window.addEventListener('loaderFinished', handleFinished);
    // @ts-ignore
    return () => window.removeEventListener('loaderFinished', handleFinished);
  }, []);

  useEffect(() => {
    if (contentVisible) {
      gsap.registerPlugin(ScrollTrigger);
      const sections = document.querySelectorAll('section');
      sections.forEach((sec) => {
        gsap.fromTo(sec, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    }
  }, [contentVisible]);

  return (
    <>
      <Loader />
      <main style={{ opacity: contentVisible ? 1 : 0, transition: 'opacity 0.8s ease', position: 'relative', zIndex: 1 }}>
        <Hero />
        <CaseStudies />

        <MidwayChat />

        <DemoViewer />
        <About />
        <ResumeTimeline />
        <NonProfitWork />
        <ContactPanel />
      </main>
    </>
  );
}
