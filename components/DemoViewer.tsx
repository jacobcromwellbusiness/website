import { useState, useRef, useEffect } from 'react';
import styles from './DemoViewer.module.css';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface Demo {
  id: string;
  name: string;
  url: string;
  description: string;
}

const DEMOS: Demo[] = [
  {
    id: 'plumbers',
    name: 'Home Service System',
    url: '/demos/plumbers/index.html',
    description: 'High-conversion landing page system built for plumbers and home service professionals.'
  },
  {
    id: 'dentures',
    name: 'Medical Clinic System',
    url: '/demos/denture/index.html',
    description: 'Clean, trust-building web architecture optimized for medical offices and denture clinics.'
  },
  {
    id: 'mechanic',
    name: 'Auto Repair Shop System',
    url: '/demos/mechanic/index.html',
    description: 'Professional, lead-generating website architecture built specifically for auto repair shops and mechanics.'
  },
  {
    id: 'lawyer',
    name: 'Law Firm System',
    url: '/demos/lawyer/index.html',
    description: 'Authoritative, trust-focused website architecture designed specifically for law firms and legal professionals.'
  }
];

export default function DemoViewer() {
  const [activeDemo, setActiveDemo] = useState<Demo>(DEMOS[0]);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDemoChange = (demo: Demo) => {
    if (demo.id === activeDemo.id) return;
    setIsTransitioning(true);
    setIsInteractive(false); // Reset interactivity on change
    setTimeout(() => {
      setActiveDemo(demo);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 400);
  };

  return (
    <section className={styles.section} id="interactive-prototypes">
      <div className={styles.header}>
        <div className={styles.eyebrow}>Live Demos</div>
        <h2 className={styles.heading}>Interactive Web Prototypes</h2>
        
        <div className={styles.desktopWarning}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          Note: This interactive experience works best on a desktop device.
        </div>

        <p className={`${styles.support} ${styles.shineText}`} style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '0.75rem' }}>
          Websites can be completely custom designed to your specific business needs. The prototypes are specifically a template design I used with a few variations.
        </p>
        <p className={styles.support}>
          Click through actual code. These are raw HTML/CSS systems built for speed and conversion, ready to be integrated into any backend.
        </p>
      </div>

      <div className={styles.layout}>
        {/* Controls Sidebar */}
        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <h3 className={styles.groupTitle}>Select Prototype</h3>
            <div className={styles.demoList}>
              {DEMOS.map(demo => (
                <button
                  key={demo.id}
                  className={`${styles.demoBtn} ${activeDemo.id === demo.id ? styles.active : ''}`}
                  onClick={() => handleDemoChange(demo)}
                >
                  <div className={styles.demoBtnIndicator} />
                  {demo.name}
                </button>
              ))}
            </div>
          </div>

          {activeDemo && (
            <div className={styles.demoInfo}>
              <p>{activeDemo.description}</p>
            </div>
          )}
        </div>

        {/* Browser Window Wrapper */}
        <div className={styles.viewerStage} onMouseLeave={() => setIsInteractive(false)}>
          <div className={`${styles.browserWindow} ${styles[viewport]}`}>
            <div className={styles.browserHeader}>
              <div className={styles.trafficLights}>
                <div className={styles.light} style={{ backgroundColor: '#ff5f56' }} />
                <div className={styles.light} style={{ backgroundColor: '#ffbd2e' }} />
                <div className={styles.light} style={{ backgroundColor: '#27c93f' }} />
              </div>
              <div className={styles.addressBar}>
                https://demo.jacobcromwell.com{activeDemo.url.replace('/demos', '')}
              </div>
            </div>
            <div className={styles.browserContent}>
              <div className={`${styles.iframeWrapper} ${isTransitioning ? styles.glitchOut : styles.glitchIn}`}>
                {!isInteractive && (
                  <div className={styles.iframeOverlay} onClick={() => setIsInteractive(true)}>
                    <div className={styles.interactBadge}>Click to Interact</div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={activeDemo.url}
                  className={styles.iframe}
                  title={activeDemo.name}
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
