import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home } from 'lucide-react';


interface Canon404ViewProps {
  onReturnHome: () => void;
}

export const Canon404View: React.FC<Canon404ViewProps> = ({ onReturnHome }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 pt-28 overflow-hidden select-none bg-[radial-gradient(ellipse_at_50%_40%,#100b20_0%,#03020a_70%)]">
      {/* Background SVG Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,130,0,0.2)' stroke-width='0.8'%3E%3Cpath d='M40 0 L40 80 M0 40 L80 40 M0 0 L80 80 M80 0 L0 80'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='38'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      ></div>

      {/* Spider-Society Monitoring System Header */}
      <p className="font-audiowide text-[10px] text-[#FF8C00]/60 tracking-[0.35em] uppercase mb-6 z-10 text-center">
        Spider-Society Monitoring System
      </p>

      {/* ASM-90 Alert Panel */}
      <motion.div
        className="relative max-w-[540px] w-full z-10 spider-flicker"
        style={{
          filter:
            'drop-shadow(0 0 28px rgba(255,130,0,0.45)) drop-shadow(0 0 70px rgba(255,80,0,0.18))',
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Hex/Octagonal Cut Border */}
        <div
          className="p-[2.5px] clip-comic-angle"
          style={{
            background:
              'linear-gradient(130deg, #FF8C00 0%, #FFB800 40%, #FF6500 70%, #FFB800 100%)',
          }}
        >
          {/* Inner Panel Background */}
          <div
            className="relative overflow-hidden clip-comic-angle p-6 sm:p-8"
            style={{
              background: 'linear-gradient(160deg, #0d0b1e 0%, #070510 100%)',
            }}
          >
            {/* Scanlines Effect */}
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none"></div>

            {/* Top Bar inside panel */}
            <div className="flex justify-between items-center pb-3 mb-6 border-b border-[#FF8C00]/20 relative z-10">
              <div className="inline-flex items-center gap-1.5 border border-[#FF8C00] bg-[#FF8C00]/10 px-3 py-1 clip-badge">
                <span className="font-audiowide text-[10px] text-[#FF8C00] tracking-widest">
                  ASM-90
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-audiowide text-[9px] text-[#FF8C00]/70 tracking-widest">
                  ALERT
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4500] animate-ping"></span>
              </div>
            </div>

            {/* Warning Triangle Icon */}
            <div className="text-center mb-5 relative z-10">
              <div className="inline-block p-3 rounded-full bg-[#FF8C00]/10 border border-[#FF8C00]/30 shadow-[0_0_20px_rgba(255,140,0,0.3)]">
                <AlertTriangle size={42} className="text-[#FFB800] animate-bounce" />
              </div>
            </div>

            {/* Canon Event Disrupted Heading */}
            <div className="text-center mb-6 relative z-10">
              <h2 className="font-bangers text-4xl sm:text-6xl text-[#FFB800] tracking-wider leading-none spider-glitch">
                CANON EVENT
              </h2>
              <h2 className="font-bangers text-4xl sm:text-6xl text-[#FF7A00] tracking-wider leading-none mt-1">
                DISRUPTED
              </h2>
            </div>

            {/* Error Divider */}
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="flex-1 h-px bg-[#FF8C00]/25"></div>
              <span className="font-audiowide text-[9px] text-[#FFB800]/70 tracking-widest whitespace-nowrap">
                ERR · 404 · UNIVERSE UNKNOWN
              </span>
              <div className="flex-1 h-px bg-[#FF8C00]/25"></div>
            </div>

            {/* Explanation Message */}
            <p className="text-center font-grotesk text-xs sm:text-sm text-amber-200/80 leading-relaxed mb-8 relative z-10">
              The page you navigated to does not exist in this timeline. <br />
              You've strayed too far from the multiverse canon.
            </p>

            {/* Return Button */}
            <div className="text-center mb-6 relative z-10">
              <button
                onClick={onReturnHome}
                className="asm-btn inline-flex items-center gap-2 font-audiowide text-[11px] text-[#FFB800] border-2 border-[#FF8C00]/70 py-3 px-6 rounded-sm bg-[#FF8C00]/10 hover:bg-[#FF8C00]/20 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(255,140,0,0.3)] active:scale-95"
              >
                <Home size={15} />
                <span>RETURN TO HOME UNIVERSE</span>
              </button>
            </div>

            {/* Bottom Panel Metadata */}
            <div className="flex justify-between items-center pt-3 border-t border-[#FF8C00]/15 text-[8px] font-audiowide text-[#FF8C00]/40 relative z-10">
              <span>SPIDER-SOCIETY</span>
              <span>PROTOCOL: BREACH-404</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Surveillance Footer */}
      <p className="font-audiowide text-[9px] text-[#FF8C00]/30 tracking-[0.25em] uppercase mt-8 z-10 text-center">
        MULTIVERSE MONITORING ACTIVE · ALL UNIVERSES UNDER SURVEILLANCE
      </p>
    </div>
  );
};
