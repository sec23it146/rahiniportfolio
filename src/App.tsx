import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import AINetworkBackground from './components/AINetworkBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <LoadingScreen onFinish={() => setReady(true)} />}
      <main
        className="relative w-full"
        style={{
          overflowX: 'clip',
          background: '#0C0C0C',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <AINetworkBackground />
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default App;
