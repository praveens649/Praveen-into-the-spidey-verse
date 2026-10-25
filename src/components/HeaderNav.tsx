import React, { useState, useEffect, useRef } from 'react';
import { AudioPlayer } from './AudioPlayer';

export type NavTab = 'home' | 'projects' | 'about' | 'experience' | 'canon404';

interface HeaderNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onReopenPortal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onTabChange,
  onReopenPortal,
}) => {
  // Authentic Earth-42 Spider state cycle from original website: idle -> dropping -> hanging -> retracting
  const [spiderState, setSpiderState] = useState<'idle' | 'dropping' | 'hanging' | 'retracting'>('idle');
  const spiderTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (spiderState === 'idle') {
      spiderTimerRef.current = setTimeout(() => {
        setSpiderState('dropping');
      }, 1500);
    } else if (spiderState === 'dropping') {
      spiderTimerRef.current = setTimeout(() => {
        setSpiderState('hanging');
      }, 2500);
    } else if (spiderState === 'hanging') {
      spiderTimerRef.current = setTimeout(() => {
        setSpiderState('retracting');
      }, 7000);
    } else if (spiderState === 'retracting') {
      spiderTimerRef.current = setTimeout(() => {
        setSpiderState('idle');
      }, 1600);
    }

    return () => {
      if (spiderTimerRef.current) clearTimeout(spiderTimerRef.current);
    };
  }, [spiderState]);

  // Track scroll position to retract Gwen & Miles when reading story cards on About page
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSpiderDown = spiderState === 'dropping' || spiderState === 'hanging';

  // Navigation tabs depending on the active page
  // On home page, Home is omitted as requested
  const navItems =
    currentTab === 'home'
      ? [
          {
            id: 'projects' as NavTab,
            label: 'PROJECTS',
            tilt: -2,
            web: { width: 350, height: 300, top: -115, right: -40, maxOpacity: 0.5 },
          },
          {
            id: 'about' as NavTab,
            label: 'ABOUT ME',
            tilt: 0,
            web: { width: 300, height: 200, left: -80, bottom: -60, maxOpacity: 0.5 },
          },
          {
            id: 'experience' as NavTab,
            label: 'EXPERIENCE',
            tilt: 2,
            web: { width: 450, height: 350, left: -70, bottom: -130, maxOpacity: 0.5 },
          },
        ]
      : currentTab === 'projects'
      ? [
          {
            id: 'home' as NavTab,
            label: 'HOME',
            tilt: -2,
            web: { width: 170, height: 124, top: -15, left: -40, maxOpacity: 0.5 },
          },
          {
            id: 'about' as NavTab,
            label: 'ABOUT ME',
            tilt: 0,
            web: { width: 300, height: 200, left: -80, bottom: -60, maxOpacity: 0.5 },
          },
          {
            id: 'experience' as NavTab,
            label: 'EXPERIENCE',
            tilt: 2,
            web: { width: 450, height: 350, left: -70, bottom: -130, maxOpacity: 0.5 },
          },
        ]
      : currentTab === 'about'
      ? [
          {
            id: 'home' as NavTab,
            label: 'HOME',
            tilt: -2,
            web: { width: 170, height: 124, top: -15, left: -40, maxOpacity: 0.5 },
          },
          {
            id: 'projects' as NavTab,
            label: 'PROJECTS',
            tilt: 0,
            web: { width: 350, height: 300, top: -115, right: -40, maxOpacity: 0.5 },
          },
          {
            id: 'experience' as NavTab,
            label: 'EXPERIENCE',
            tilt: 2,
            web: { width: 450, height: 350, left: -70, bottom: -130, maxOpacity: 0.5 },
          },
        ]
      : [
          {
            id: 'home' as NavTab,
            label: 'HOME',
            tilt: -2,
            web: { width: 170, height: 124, top: -15, left: -40, maxOpacity: 0.5 },
          },
          {
            id: 'projects' as NavTab,
            label: 'PROJECTS',
            tilt: -1,
            web: { width: 350, height: 300, top: -115, right: -40, maxOpacity: 0.5 },
          },
          {
            id: 'about' as NavTab,
            label: 'ABOUT ME',
            tilt: 1,
            web: { width: 300, height: 200, left: -80, bottom: -60, maxOpacity: 0.5 },
          },
        ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* 1. Spider Web strictly flush at top-0 left-0 with dropping & swaying Earth-42 spider */}
      <div
        className="hidden md:block pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '240px',
          height: '240px',
          overflow: 'visible',
          zIndex: 110,
        }}
      >
        <div
          className="absolute top-0 left-0 pointer-events-auto"
          style={{ position: 'absolute', top: 0, left: 0, width: '240px', height: '240px', zIndex: 11 }}
          onMouseEnter={() => {
            if (spiderState === 'idle') setSpiderState('dropping');
          }}
        >
          <img
            src="/home/spiderweb.png"
            alt="Spiderweb"
            width={712}
            height={712}
            className="w-[235px] h-auto object-contain pointer-events-none filter drop-shadow(0 0 10px rgba(0,240,255,0.25))"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'block',
            }}
          />

          {/* Interactive Earth-42 Spider dropping, swaying, and retracting */}
          <div
            className="absolute cursor-pointer pointer-events-auto group"
            style={{
              position: 'absolute',
              left: '18px',
              top: isSpiderDown ? '12px' : '-140px',
              width: '115px',
              height: '115px',
              transition:
                spiderState === 'dropping'
                  ? 'top 2500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  : spiderState === 'retracting'
                  ? 'top 1600ms cubic-bezier(0.55, 0.06, 0.68, 0.19)'
                  : 'none',
              animation: spiderState === 'hanging' ? 'spider-sway 2.5s ease-in-out infinite' : 'none',
              pointerEvents: isSpiderDown ? 'auto' : 'none',
              cursor: isSpiderDown ? 'pointer' : 'default',
            }}
            onClick={onReopenPortal}
            title={isSpiderDown ? 'psst… Click to open Multiverse Portal' : undefined}
          >
            <img
              src="/home/spider42.png"
              alt="Spider"
              width={150}
              height={150}
              className="w-[115px] h-[115px] object-contain filter drop-shadow(0 0 16px rgba(230,62,55,0.9)) group-hover:drop-shadow(0 0 24px rgba(0,240,255,1)) group-hover:scale-105 transition-all duration-300"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* 2. Top Overhead Roof Beam (Trapezoid Rooftop Ledge from original) */}
      <div
        className="hidden md:block fixed top-0 left-0 w-full"
        style={{ height: '155px', zIndex: 100 }}
      >
        {/* Trapezoid Roof Ledge Beam sleeker and well proportioned */}
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{
            background: 'linear-gradient(360deg, #3D2425 55%, #825253 100%)',
            clipPath: 'polygon(9.5% 0%, 90.5% 0%, 85.5% 50%, 14.5% 50%)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.85)',
          }}
        />

        {/* Slanted Comic Nav Menu on Left Side of Roof */}
        <nav
          className="absolute inset-0 pt-2.5 left-[15%] z-20 pointer-events-auto flex items-center"
          aria-label="Main navigation"
          style={{ height: '78px' }}
        >
          <div
            className="flex items-center"
            style={{ gap: 'clamp(0.5rem, 1.3vw, 0.95rem)' }}
          >
            {navItems.map((item, idx) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={currentTab === item.id}
                showSeparatorBefore={idx > 0}
                onClick={() => onTabChange(item.id)}
              />
            ))}
          </div>
        </nav>

        {/* 3. Gwen Stacy & Miles Morales Upside Down on the Rooftop Ledge */}
        <div
          className="absolute flex items-start pointer-events-auto transition-all duration-500 ease-out"
          style={{
            top: 38,
            right: '14%',
            zIndex: 10,
            opacity: currentTab === 'about' && isScrolled ? 0 : 1,
            transform: currentTab === 'about' && isScrolled ? 'translateY(-120%) scale(0.95)' : 'translateY(0) scale(1)',
            pointerEvents: currentTab === 'about' && isScrolled ? 'none' : 'auto',
          }}
        >
          {/* Gwen Stacy (Upside Down) */}
          <div className="relative" style={{ height: '280px' }}>
            {/* Gwen Shadow */}
            <img
              src="/characters/gwen.png"
              alt="Gwen Shadow"
              aria-hidden="true"
              width={678}
              height={1076}
              className="absolute w-auto pointer-events-none"
              style={{
                bottom: '88%',
                left: 0,
                transform: 'scaleY(-1)',
                filter: 'brightness(0) blur(2px)',
                opacity: 0.35,
              }}
            />
            {/* Gwen Real Character PNG */}
            <img
              src="/characters/gwen.png"
              alt="Gwen Stacy"
              width={678}
              height={1076}
              className="h-full w-auto filter drop-shadow(0 4px 15px rgba(0,0,0,0.85))"
            />
          </div>

          {/* Miles Morales with Dangling Spider-Web & Phone Player */}
          <div className="relative" style={{ height: '280px' }}>
            {/* Miles Shadow */}
            <img
              src="/characters/miles.png"
              alt="Miles Shadow"
              aria-hidden="true"
              width={678}
              height={1076}
              className="absolute w-auto pointer-events-none"
              style={{
                bottom: '88%',
                left: 0,
                transform: 'scaleY(-1)',
                filter: 'brightness(0) blur(2px)',
                opacity: 0.35,
              }}
            />

            {/* Dangling Webslinger Lines & Smartphone Player between Gwen and Miles */}
            <div className="absolute -left-5 bottom-[30%]" style={{ zIndex: 5 }}>
              {/* Radial shadow at web attachment root */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: -15,
                  width: '50px',
                  height: '25px',
                  borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 50%)',
                  filter: 'blur(6px)',
                  zIndex: 1,
                }}
              />

              {/* Spiderweb Thread from reference website */}
              <img
                src="/home/webholder.svg"
                alt="Webslinger Lines"
                width={100}
                height={100}
                className="h-45 w-auto relative pointer-events-none"
                style={{ zIndex: 2 }}
              />

              {/* Hanging Smartphone Music Player */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: '93%', zIndex: 1 }}
              >
                <AudioPlayer />
              </div>
            </div>

            {/* Miles Real Character PNG */}
            <img
              src="/characters/miles.png"
              alt="Miles Morales"
              width={678}
              height={1076}
              className="h-full w-auto filter drop-shadow(0 4px 15px rgba(0,0,0,0.85))"
            />
          </div>
        </div>
      </div>

      {/* Mobile Top Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#160c22]/95 border-b border-white/10 px-4 py-2.5 flex items-center justify-between pointer-events-auto backdrop-blur-md z-[120]">
        <button
          onClick={() => onTabChange('home')}
          className="font-bangers text-lg text-[#E63E37] tracking-wider"
        >
          PRAVEEN
        </button>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`font-bangers text-xs px-3 py-1.5 rounded ${
                currentTab === item.id
                  ? 'bg-[#E63E37] text-white'
                  : 'bg-white/10 text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

interface NavButtonProps {
  item: {
    id: NavTab;
    label: string;
    tilt: number;
    web: { width: number; height: number; top?: number; right?: number; bottom?: number; left?: number; maxOpacity: number };
  };
  isActive: boolean;
  showSeparatorBefore: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  item,
  isActive,
  showSeparatorBefore,
  onClick,
}) => {
  const webRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-[inherit]">
      {showSeparatorBefore && (
        <svg width="28" height="9" viewBox="0 0 32 10" fill="none" aria-hidden="true">
          <line
            x1="0"
            y1="5"
            x2="11"
            y2="5"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.9"
            strokeDasharray="2 1.5"
          />
          <circle cx="16" cy="5" r="3" fill="rgba(255,255,255,0.65)" />
          <line
            x1="21"
            y1="5"
            x2="32"
            y2="5"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.9"
            strokeDasharray="2 1.5"
          />
        </svg>
      )}
      <button
        onClick={onClick}
        className="relative px-5 py-2.5 text-[12px] sm:text-[13px] uppercase overflow-hidden cursor-pointer"
        style={{
          color: isActive ? '#ffffff' : '#2a1012',
          background: isActive ? '#E63E37' : '#ffffff',
          border: '2.5px solid #1a0a0b',
          boxShadow: isActive ? '3px 3px 0 #1a0a0b, 0 0 10px rgba(230,62,55,0.6)' : '3px 3px 0 #1a0a0b',
          rotate: `${item.tilt}deg`,
          letterSpacing: '0.2em',
          fontFamily: 'var(--font-audiowide), Outfit, sans-serif',
          fontWeight: 700,
          lineHeight: 1,
          transition: 'translate 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
          display: 'block',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.translate = '0 -3px';
          e.currentTarget.style.boxShadow =
            '3px 3px 0 #1a0a0b, -2px 0 0 #e91e8c, 2px 0 0 #00bcd4';
          if (webRef.current) {
            webRef.current.style.clipPath = 'circle(150% at 50% 50%)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.translate = '';
          e.currentTarget.style.boxShadow = isActive
            ? '3px 3px 0 #1a0a0b, 0 0 10px rgba(230,62,55,0.6)'
            : '3.5px 3.5px 0 #1a0a0b';
          if (webRef.current) {
            webRef.current.style.clipPath = 'circle(0% at 50% 50%)';
          }
        }}
      >
        {/* Animated spiderweb crawl on hover */}
        <div
          ref={webRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: item.web.top,
            left: item.web.left,
            right: item.web.right,
            bottom: item.web.bottom,
            width: item.web.width,
            height: item.web.height,
            backgroundImage: 'url(/home/crawl-web.svg)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            opacity: item.web.maxOpacity,
            clipPath: 'circle(0% at 50% 50%)',
            transition: 'clip-path 10s ease',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {item.label}
      </button>
    </div>
  );
};
