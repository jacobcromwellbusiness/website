import Hero from '@/components/Hero';
import PositioningBand from '@/components/PositioningBand';
import ProjectRail from '@/components/ProjectRail';
import ProcessRows from '@/components/ProcessRows';
import About from '@/components/About';
import ContactPanel from '@/components/ContactPanel';

export default function Home() {
  return (
    <main>
      <Hero />
      <PositioningBand />
      <ProjectRail />
      <ProcessRows />
      <About />
      <ContactPanel />
    </main>
  );
}
