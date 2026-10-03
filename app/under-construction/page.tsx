import Link from 'next/link';
import Image from 'next/image';

export default function UnderConstruction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '0 20px', backgroundColor: 'transparent' }}>
      <Image 
        src="/images/profile_picture-removebg.webp" 
        alt="Jacob Cromwell" 
        width={96} 
        height={96} 
        style={{ borderRadius: '50%', border: '3px solid var(--line-dark)', background: 'var(--navy-deep)', marginBottom: '32px' }}
      />
      <h1 style={{ color: '#FF5722', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '16px', letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>
        Under Construction
      </h1>
      <p style={{ color: 'var(--muted-dark)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '48px', fontSize: '1.05rem', fontFamily: 'var(--font-body)' }}>
        This specific path is currently being updated. Please check back later or start over to view the main portfolio.
      </p>
      <Link href="/" style={{ padding: '16px 32px', background: 'var(--ink-raised)', color: 'white', borderRadius: '30px', textDecoration: 'none', border: '1px solid var(--line-dark)', transition: 'all 0.2s ease', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
        &larr; Start Over
      </Link>
    </div>
  );
}
