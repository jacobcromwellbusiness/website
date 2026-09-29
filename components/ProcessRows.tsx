'use client';
import { useEffect, useRef } from 'react';
import styles from './ProcessRows.module.css';

const processes = [
  {
    num: '01',
    title: 'FIND THE BOTTLENECK',
    desc: 'Identify where the system is breaking down or leaking revenue. Before building anything, we locate the actual constraint.'
  },
  {
    num: '02',
    title: 'MAP THE JOURNEY',
    desc: 'Design the click-to-cash flow. We blueprint the exact sequence of events that turns attention into action.'
  },
  {
    num: '03',
    title: 'BUILD THE SYSTEM',
    desc: 'Connect the tools. Whether it is Make.com, n8n, or custom code, we assemble the architecture.'
  },
  {
    num: '04',
    title: 'SHIP, WATCH, IMPROVE',
    desc: 'Launch the workflow and monitor the signal. We refine the process based on real user behavior and outcomes.'
  }
];

export default function ProcessRows() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateLine);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const rows = containerRef.current?.querySelectorAll(`.${styles.row}`);
    rows?.forEach(row => observer.observe(row));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>02 / PROCESS</div>
        
        <div className={styles.rows}>
          {processes.map((proc, index) => (
            <div key={proc.num} className={styles.row}>
              <div className={styles.lineTrack}>
                <div className={styles.lineFill}></div>
              </div>
              <div className={styles.content}>
                <div className={styles.number}>{proc.num}</div>
                <h3 className={styles.title}>{proc.title}</h3>
                <p className={styles.desc}>{proc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
