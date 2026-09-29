'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectRail.module.css';
import { getPublishedProjects } from '@/content/projects';

export default function ProjectRail() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = getPublishedProjects();

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
      
      // Calculate current index for progress track
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || clientWidth;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [projects.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth'
      });
    }
  };

  if (projects.length === 0) {
    return (
      <section id="work" className={styles.section}>
        <div className={styles.header}>
          <div className={styles.index}>01 / SELECTED WORK</div>
          <h2 className={styles.heading}>BUILT TO MOVE FROM IDEA TO OUTPUT.</h2>
          <p className={styles.explanation}>Selected projects are being documented.</p>
        </div>
        <div className={styles.emptyState}>
          <p>Work is currently being prepared for presentation.</p>
          <Link href="#contact" className="pill">Contact to see recent work</Link>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <div className={styles.index}>01 / SELECTED WORK</div>
            <h2 className={styles.heading}>BUILT TO MOVE FROM IDEA TO OUTPUT.</h2>
            <p className={styles.explanation}>A collection of experiments, systems, and shipped work.</p>
          </div>
          
          <div className={styles.controls}>
            <button 
              className={styles.controlBtn} 
              onClick={() => scroll('left')} 
              disabled={!canScrollLeft}
              aria-label="Previous project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className={styles.controlBtn} 
              onClick={() => scroll('right')} 
              disabled={!canScrollRight}
              aria-label="Next project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className={styles.progressTrack}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
          />
        </div>
      </div>

      <div 
        className={styles.rail} 
        ref={scrollContainerRef} 
        onScroll={checkScroll}
      >
        {projects.map((project) => (
          <article key={project.slug} className={styles.card}>
            <Link href={`/work/${project.slug}`} className={styles.cardLink}>
              <div className={styles.mediaArea}>
                <Image 
                  src={project.cover.src} 
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  className={styles.media}
                />
                <div className={styles.categoryPill}>{project.category}</div>
                <div className={styles.arrowIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{project.title} <span className={styles.cardYear}>{project.year}</span></h3>
                <p className={styles.cardSummary}>{project.summary}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
