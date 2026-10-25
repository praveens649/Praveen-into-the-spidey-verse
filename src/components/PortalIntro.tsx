import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PortalIntroProps {
  onEnter: () => void;
}

export const PortalIntro: React.FC<PortalIntroProps> = ({ onEnter }) => {
  const [isEntering, setIsEntering] = useState(false);

  const handlePortalClick = () => {
    if (isEntering) return;
    setIsEntering(true);

    // Play portal whoosh audio sound
    try {
      const audio = new Audio('/loading/portal.mp3');
      audio.volume = 0.8;
      audio.play().catch((e) => console.log('Audio autoplay prevented:', e));
    } catch (e) {
      console.log('Audio error:', e);
    }

    // Trigger transition
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#0a0212] flex flex-col items-center justify-center overflow-hidden select-none bg-halftone"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        {/* Multiverse Radial Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(120,40,200,0.22)_0%,transparent_70%)] pointer-events-none"></div>

        {/* Floating Scratches Overlay */}
        <img
          src="/loading/scrathes.svg"
          alt="Scratches"
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-screen"
        />

        {/* Top Header: Across the Spider-Verse */}
        <motion.p
          className="font-audiowide text-white/50 text-[10px] sm:text-xs md:text-sm tracking-[0.45em] uppercase z-10 text-center px-4"
          animate={{
            opacity: [0.4, 0.9, 0.4],
            textShadow: [
              '0 0 5px rgba(255,255,255,0.2)',
              '0 0 15px rgba(0,240,255,0.6)',
              '0 0 5px rgba(255,255,255,0.2)',
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ACROSS THE SPIDER-VERSE
        </motion.p>

        {/* Central Hexagonal Portal */}
        <motion.div
          className="relative my-6 sm:my-8 cursor-pointer group"
          onClick={handlePortalClick}
          animate={
            isEntering
              ? {
                  scale: [1, 1.1, 15],
                  rotate: [0, 45, 180],
                  filter: [
                    'hue-rotate(0deg) brightness(1)',
                    'hue-rotate(90deg) brightness(2)',
                    'hue-rotate(180deg) brightness(3)',
                  ],
                  opacity: [1, 1, 0],
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                }
              : {
                  scale: [1, 1.04, 1],
                  filter: [
                    'drop-shadow(0 0 25px rgba(230,62,55,0.4)) drop-shadow(0 0 50px rgba(0,240,255,0.3))',
                    'drop-shadow(0 0 35px rgba(255,140,0,0.6)) drop-shadow(0 0 70px rgba(120,40,200,0.5))',
                    'drop-shadow(0 0 25px rgba(230,62,55,0.4)) drop-shadow(0 0 50px rgba(0,240,255,0.3))',
                  ],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Rotating dimensional glow ring */}
          <div className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] relative">
            <img
              src="/loading/portal.png"
              alt="Multiverse Portal"
              className="w-full h-full object-contain portal-spin pointer-events-none"
            />

            {/* Portal center interactive text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="font-bangers text-white text-sm sm:text-base tracking-[0.3em] leading-none drop-shadow-[0_2px_4px_#000]">
                TOUCH
              </span>
              <span className="font-bangers text-[#E63E37] text-3xl sm:text-5xl md:text-6xl tracking-wider leading-none py-1 drop-shadow-[0_4px_8px_#000] spider-glitch">
                THE
              </span>
              <span className="font-bangers text-white text-sm sm:text-base tracking-[0.3em] leading-none drop-shadow-[0_2px_4px_#000]">
                PORTAL
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Tagline: Anyone Can Wear The Mask */}
        <motion.p
          className="font-bangers text-white text-2xl sm:text-4xl md:text-5xl tracking-wider uppercase text-center px-4 leading-tight z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          ANYONE CAN WEAR <span className="text-[#E63E37] comic-shadow-red">THE MASK.</span>
        </motion.p>

        {/* Skip button for quick navigation & accessibility */}
        <button
          onClick={onEnter}
          className="absolute bottom-6 right-6 font-audiowide text-[10px] text-white/40 hover:text-white border border-white/10 hover:border-[#00f0ff]/50 px-3 py-1.5 rounded transition-all cursor-pointer bg-white/5 backdrop-blur-sm"
        >
          SKIP INTRO →
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
