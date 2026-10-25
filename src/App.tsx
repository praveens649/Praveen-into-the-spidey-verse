import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNav, type NavTab } from './components/HeaderNav';
import { PortalIntro } from './components/PortalIntro';
import { HomeHero } from './components/HomeHero';
import { AboutView } from './components/AboutView';
import { ProjectsView } from './components/ProjectsView';
import { ExperienceView } from './components/ExperienceView';
import { Canon404View } from './components/Canon404View';

export function App() {
  const [hasEnteredPortal, setHasEnteredPortal] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');

  // Handle URL hash navigation or history
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as NavTab;
      if (['home', 'projects', 'about', 'experience', 'canon404'].includes(hash)) {
        setCurrentTab(hash);
        setHasEnteredPortal(true);
      }
    };

    if (window.location.hash) {
      handleHash();
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0a0212] text-white overflow-x-hidden">
      {/* 1. Dimensional Portal Introductory Overlay */}
      {!hasEnteredPortal && (
        <PortalIntro
          onEnter={() => {
            setHasEnteredPortal(true);
          }}
        />
      )}

      {/* 2. Main Universe Portfolio Experience */}
      {hasEnteredPortal && (
        <div className="flex flex-col min-h-screen">
          {/* Header Navigation with rooftop beam, Gwen, Miles & Audio player */}
          <HeaderNav
            currentTab={currentTab}
            onTabChange={handleTabChange}
            onReopenPortal={() => setHasEnteredPortal(false)}
          />

          {/* Dynamic Content Views */}
          <main className="flex-1 w-full relative">
            <AnimatePresence mode="wait">
              {currentTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <HomeHero />
                </motion.div>
              )}

              {currentTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ProjectsView />
                </motion.div>
              )}

              {currentTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <AboutView />
                </motion.div>
              )}

              {currentTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <ExperienceView />
                </motion.div>
              )}

              {currentTab === 'canon404' && (
                <motion.div
                  key="canon404"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <Canon404View onReturnHome={() => handleTabChange('home')} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
