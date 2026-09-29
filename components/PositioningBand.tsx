'use client';
import { useState } from 'react';
import styles from './PositioningBand.module.css';
import { capabilities } from '@/content/capabilities';

export default function PositioningBand() {
  const [activeCap, setActiveCap] = useState(capabilities[0].id);

  const activeCapability = capabilities.find(c => c.id === activeCap) || capabilities[0];

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.statement}>
          Ideas are useful.<br />
          <span className={styles.highlight}>Connected systems make them work.</span>
        </h2>
        
        <div className={styles.interactiveArea}>
          <div className={styles.pillContainer}>
            {capabilities.map(cap => (
              <button
                key={cap.id}
                className={`pill ${activeCap === cap.id ? 'pill-active' : ''}`}
                onClick={() => setActiveCap(cap.id)}
                aria-pressed={activeCap === cap.id}
              >
                {cap.title}
              </button>
            ))}
          </div>
          
          <div className={styles.contentArea}>
            <p className={styles.description}>
              {activeCapability.visual}. Core focus areas include: {activeCapability.topics.join(', ')}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
