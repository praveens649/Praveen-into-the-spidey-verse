import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, type Variants } from 'framer-motion';

// Authentic Comic Card Style from original website reverse engineering
const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #3D2425, #5A2C2D)',
  backgroundImage: `
    radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(135deg, #3D2425, #5A2C2D)
  `,
  backgroundSize: '12px 12px, 100% 100%',
  border: '4px solid #1a0a0b',
  boxShadow: '6px 6px 0 #1a0a0b, 16px 16px 0 rgba(0,0,0,0.2)',
};

const textStyle: React.CSSProperties = {
  fontFamily: 'var(--font-bangers, "Bangers", cursive)',
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  lineHeight: 1.2,
  margin: 0,
  textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
};

// Interactive Mask Split Comparison Component
interface MaskSliderProps {
  isMobile: boolean;
}

const MaskSlider: React.FC<MaskSliderProps> = ({ isMobile }) => {
  const [sliderPos, setSliderPos] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (clientX: number) => {
    isDragging.current = true;
    updatePosition(clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging.current) {
        updatePosition(e.clientX);
      }
    };
    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [updatePosition]);

  const imgWidth = isMobile ? 'min(78vw, 280px)' : 'min(36vw, 290px)';

  return (
    <div
      ref={containerRef}
      className="relative select-none touch-none cursor-ew-resize"
      style={{ lineHeight: 0 }}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onTouchStart={(e) => {
        isDragging.current = true;
        updatePosition(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (isDragging.current) {
          updatePosition(e.touches[0].clientX);
        }
      }}
      onTouchEnd={() => {
        isDragging.current = false;
      }}
    >
      {/* Background: Masked Spider-Man */}
      <img
        src="/about/masked.png"
        alt="Spider-Man — masked"
        style={{ width: imgWidth, height: 'auto', display: 'block' }}
        draggable={false}
      />

      {/* Foreground: Unmasked Praveen with horizontal clip-path */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src="/about/non-masked.png"
          alt="Praveen — unmasked"
          style={{ width: imgWidth, height: 'auto', display: 'block' }}
          draggable={false}
        />
      </div>

      {/* Vertical Divider Line */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: 'translateX(-50%)',
          width: '4px',
          background: '#ffffff',
          boxShadow: '0 0 0 2px #1a0a0b',
        }}
      />

      {/* Circular Drag Handle */}
      <div
        className="absolute top-1/2 pointer-events-none flex items-center justify-center"
        style={{
          left: `${sliderPos}%`,
          transform: 'translate(-50%, -50%)',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '3px solid #1a0a0b',
          boxShadow: '3px 3px 0 #1a0a0b',
        }}
      >
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path
            d="M0 5h16M3 1L0 5l3 4M13 1l3 4-3 4"
            stroke="#1a0a0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* UNMASK ME Prompt when slider is near start */}
      {sliderPos < 8 && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none uppercase whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-bangers, "Bangers", cursive)',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            color: '#ffffff',
            textShadow: '1px 1px 0 #000, -1px -1px 0 #000',
            letterSpacing: '0.08em',
          }}
        >
          unmask me
        </div>
      )}
    </div>
  );
};

export const AboutView: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isZooming, setIsZooming] = useState<boolean>(false);
  const autoRedirectTriggered = useRef<boolean>(false);
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  const triggerZoomToProjects = useCallback(() => {
    if (isZooming) return;
    setIsZooming(true);
    setTimeout(() => {
      window.location.hash = 'projects';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2200);
  }, [isZooming]);

  // Handle automatic redirect after 3 seconds upon reaching Section 5
  const handleSection5InView = useCallback(() => {
    if (autoRedirectTriggered.current) return;
    autoRedirectTriggered.current = true;

    redirectTimerRef.current = setTimeout(() => {
      triggerZoomToProjects();
    }, 3000);
  }, [triggerZoomToProjects]);

  // Stagger drop animation variants for the 4 narrative story cards in Section 3
  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.25 : 0.45,
        delayChildren: 0.1,
      },
    },
  };

  const cardDropVariants: Variants = {
    hidden: (rotation: number) => ({
      opacity: 0,
      y: -140,
      rotate: rotation + 6,
      scale: 0.9,
    }),
    visible: (rotation: number) => ({
      opacity: 1,
      y: 0,
      rotate: rotation,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 14,
        mass: 1.1,
      },
    }),
  };

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Background: Sunset Sky Gradient with blend clouds (persists across section 1-4) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'linear-gradient(180deg, #806A89 0%, #C6949A 23%, #E5BEA4 58%, #92918D 100%)',
        }}
      >
        <img
          src="/home/clouds.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover mix-blend-darken"
        />
      </div>

      {/* ========================================================================= */}
      {/* FIXED BOTTOM FANNED COMIC PANELS                                          */}
      {/* Positioned at z-index: 5 (above background sky, below cards at z-index: 20)*/}
      {/* ========================================================================= */}
      <div
        className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        {/* 1. Peter Parker (Left) */}
        <div
          className="absolute -bottom-[34vw] -left-[20%]"
          style={{
            animation: 'panel-float 3.8s ease-in-out infinite',
            animationDelay: '0s',
          }}
        >
          <img
            src="/about/comics/peter.jpeg"
            alt="Peter Parker comic panel"
            style={{ width: '35vw', height: 'auto' }}
            className="rotate-32 shadow-[8px_8px_0_#1a0a0b]"
          />
        </div>

        {/* 2. Spider-Man Noir (Mid-Left) */}
        <div
          className="absolute -bottom-[40vw] left-[10%]"
          style={{
            animation: 'panel-float 4.4s ease-in-out infinite',
            animationDelay: '0.9s',
          }}
        >
          <img
            src="/about/comics/noir.jpeg"
            alt="Spider-Man Noir comic panel"
            style={{ width: '35vw', height: 'auto' }}
            className="-rotate-21 shadow-[8px_8px_0_#1a0a0b]"
          />
        </div>

        {/* 3. Spider-Ham (Far Right) */}
        <div
          className="absolute -bottom-[39vw] -right-[20%]"
          style={{
            animation: 'panel-float 3.3s ease-in-out infinite',
            animationDelay: '1.6s',
          }}
        >
          <img
            src="/about/comics/ham.jpeg"
            alt="Spider-Ham comic panel"
            style={{ width: '35vw', height: 'auto' }}
            className="-rotate-24 shadow-[8px_8px_0_#1a0a0b]"
          />
        </div>

        {/* 4. Spider-Gwen (Mid-Right) */}
        <div
          className="absolute -bottom-[42vw] left-[50%]"
          style={{
            animation: 'panel-float 4.9s ease-in-out infinite',
            animationDelay: '0.4s',
          }}
        >
          <img
            src="/about/comics/gwen.jpeg"
            alt="Spider-Gwen comic panel"
            style={{ width: '35vw', height: 'auto' }}
            className="rotate-6 shadow-[8px_8px_0_#1a0a0b]"
          />
        </div>

        {/* 5. Miles Morales (Center) */}
        <div
          className="absolute -bottom-[44vw] left-[20%]"
          style={{
            animation: 'panel-float 4.1s ease-in-out infinite',
            animationDelay: '1.2s',
          }}
        >
          <img
            src="/about/comics/miles.jpg"
            alt="Miles Morales comic panel"
            style={{ width: '35vw', height: 'auto' }}
            className="rotate-28 shadow-[8px_8px_0_#1a0a0b]"
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: HERO BILLBOARD + SCROLL INDICATOR             */}
      {/* ======================================================== */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center pt-14 pb-8 overflow-hidden z-20">
        {/* Main Central Billboard Box */}
        <motion.div
          className="relative text-center z-20 cursor-default"
          style={{
            maxWidth: 'min(84vw, 920px)',
            padding: isMobile ? '1.5rem 2rem' : '2.2rem 3.5rem',
            ...cardStyle,
            transform: 'rotate(-1.5deg)',
          }}
          initial={{ opacity: 0, y: -80, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          whileHover={{ scale: 1.015, y: -4, transition: { duration: 0.2 } }}
          transition={{
            duration: 1.1,
            type: 'spring',
            stiffness: 120,
            damping: 14,
            delay: 0.2,
          }}
        >
          <p
            style={{
              ...textStyle,
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 4.2rem)' : 'clamp(2.4rem, 6vw, 5.5rem)',
            }}
          >
            Alright, let's do this
            <br />
            one more time...
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <div
          className="absolute z-20 flex flex-col items-center gap-1.5 pointer-events-none"
          style={{ bottom: '20vh' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
              fontSize: '0.58rem',
              color: 'rgba(245,245,240,0.45)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            scroll
          </span>
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
            <rect
              x="1"
              y="1"
              width="16"
              height="28"
              rx="8"
              stroke="rgba(245,245,240,0.3)"
              strokeWidth="1.5"
            />
            <circle cx="9" cy="9" r="2.5" fill="rgba(230,62,55,0.75)">
              <animate attributeName="cy" values="9;19;9" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: BIO INTRO CARD + PRAVEEN NAME BADGE                            */}
      {/* Positioned comfortably above the bottom comic panels                       */}
      {/* ========================================================================= */}
      <section className="relative z-20 min-h-screen w-full flex items-start justify-center px-6 sm:px-12 pt-24 md:pt-28 pb-48">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-5xl w-full">
          {/* Left Comic Card */}
          <motion.div
            className="w-full md:w-[340px] max-w-[350px] flex-shrink-0 cursor-default"
            style={{
              padding: '1.5rem 2rem',
              transform: 'rotate(-1.5deg)',
              ...cardStyle,
            }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.025, y: -6, transition: { duration: 0.2 } }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 120,
              damping: 14,
            }}
          >
            <p style={{ ...textStyle, fontSize: 'clamp(1.05rem, 2vw, 1.45rem)' }}>
              <span
                style={{
                  fontSize: '1.2em',
                  color: '#E63E37',
                  display: 'block',
                  marginBottom: '0.25em',
                }}
              >
                Software developer.
              </span>
              I build things on the internet.
              <br />
              And for the past few years…
              <br />
              I've been swinging between
              <br />
              <span style={{ color: '#E63E37' }}>websites and apps</span>
            </p>
          </motion.div>

          {/* Right: Praveen Name Card Badge */}
          <motion.div
            className="w-full md:w-[360px] max-w-[380px] flex-shrink-0 flex justify-center cursor-default"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.025, y: -6, transition: { duration: 0.2 } }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 120,
              damping: 14,
              delay: 0.15,
            }}
          >
            <img
              src="/about/name-card.svg"
              alt="Hello, my name is Praveen — name card"
              className="w-full h-auto"
              style={{
                filter: 'drop-shadow(6px 6px 0 #1a0a0b)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: THE 4 COMIC STORY CARDS GRID                                   */}
      {/* Arranged in a clean 2x2 CSS Grid - NO OVERLAPPING POSSIBLE                */}
      {/* ========================================================================= */}
      <section className="relative z-20 min-h-screen w-full flex items-start justify-center px-6 sm:px-12 pt-24 md:pt-28 pb-48">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 lg:gap-8 max-w-4xl w-full justify-items-center"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Card 1: Maps */}
          <motion.div
            className="s3-card cursor-pointer w-full max-w-[340px]"
            custom={-2}
            variants={cardDropVariants}
            whileHover={{ scale: 1.035, y: -6, transition: { duration: 0.2 } }}
            style={{
              padding: '1.25rem 1.75rem',
              ...cardStyle,
            }}
          >
            <p style={{ ...textStyle, fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
              I've worked with maps.
              <br />
              <span style={{ color: '#E63E37' }}>A lot of maps.</span>
            </p>
          </motion.div>

          {/* Card 2: Systems Scale */}
          <motion.div
            className="s3-card cursor-pointer w-full max-w-[340px]"
            custom={1.5}
            variants={cardDropVariants}
            whileHover={{ scale: 1.035, y: -6, transition: { duration: 0.2 } }}
            style={{
              padding: '1.25rem 1.75rem',
              ...cardStyle,
            }}
          >
            <p style={{ ...textStyle, fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
              Built systems that don't just look good,
              <br />
              <span style={{ color: '#E63E37' }}>they scale.</span>
            </p>
          </motion.div>

          {/* Card 3: Messy Data */}
          <motion.div
            className="s3-card cursor-pointer w-full max-w-[340px]"
            custom={-1.5}
            variants={cardDropVariants}
            whileHover={{ scale: 1.035, y: -6, transition: { duration: 0.2 } }}
            style={{
              padding: '1.25rem 1.75rem',
              ...cardStyle,
            }}
          >
            <p style={{ ...textStyle, fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
              Turned messy data into
              <br />
              <span style={{ color: '#E63E37' }}>something usable.</span>
            </p>
          </motion.div>

          {/* Card 4: Broke Things */}
          <motion.div
            className="s3-card cursor-pointer w-full max-w-[340px]"
            custom={2}
            variants={cardDropVariants}
            whileHover={{ scale: 1.035, y: -6, transition: { duration: 0.2 } }}
            style={{
              padding: '1.25rem 1.75rem',
              ...cardStyle,
            }}
          >
            <p style={{ ...textStyle, fontSize: 'clamp(1.1rem, 1.8vw, 1.55rem)' }}>
              And yeah… <span style={{ color: '#E63E37' }}>broke things</span>
              <br />
              along the way too.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: INTERACTIVE MASK COMPARISON & SPEECH BUBBLE   */}
      {/* ======================================================== */}
      <section className="relative z-20 min-h-screen w-full flex items-start justify-center px-6 sm:px-12 pt-24 md:pt-28 pb-48">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14 max-w-5xl w-full">
          {/* Left: Interactive Split Mask Slider */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -80, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.85,
              type: 'spring',
              stiffness: 120,
              damping: 14,
            }}
          >
            <div
              style={{
                border: '6px solid #1a0a0b',
                boxShadow: '10px 10px 0 #1a0a0b',
                lineHeight: 0,
              }}
            >
              <MaskSlider isMobile={isMobile} />
            </div>
          </motion.div>

          {/* Right: Comic Speech Bubble & Yellow Tag */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.6, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 150,
              damping: 12,
              delay: 0.15,
            }}
          >
            {/* Desktop Speech Bubble Triangle Pointer */}
            {!isMobile && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: '-30px',
                    top: '48px',
                    width: 0,
                    height: 0,
                    borderTop: '16px solid transparent',
                    borderBottom: '16px solid transparent',
                    borderRight: '30px solid #1a0a0b',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '54px',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderRight: '20px solid #ffffff',
                  }}
                />
              </>
            )}

            {/* White Speech Bubble Container */}
            <div
              style={{
                background: '#ffffff',
                border: '5px solid #1a0a0b',
                borderRadius: '24px',
                padding: isMobile ? '1.5rem 2rem' : '2rem 3.2rem',
                boxShadow: '8px 8px 0 #1a0a0b',
                maxWidth: isMobile ? 'min(85vw, 420px)' : '420px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                  color: '#1a0a0b',
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  margin: 0,
                  letterSpacing: '0.03em',
                  lineHeight: 1,
                  textShadow: 'none',
                }}
              >
                Yep.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                  color: '#1a0a0b',
                  fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                  margin: 0,
                  letterSpacing: '0.05em',
                  lineHeight: 1.1,
                  textShadow: 'none',
                }}
              >
                That's me.
              </p>
            </div>

            {/* Yellow Comic Tag */}
            <div
              className="absolute right-0"
              style={{
                marginTop: '0.8rem',
                display: 'inline-block',
                padding: '0.4rem 1.1rem',
                background: '#F5D547',
                border: '3px solid #1a0a0b',
                boxShadow: '4px 4px 0 #1a0a0b',
                transform: 'rotate(1.5deg)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                  color: '#1a0a0b',
                  fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)',
                  margin: 0,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                }}
              >
                At least a version of me
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: FINAL STATEMENT & 3-SECOND AUTO MULTIVERSE ZOOM                */}
      {/* (Solid background covers comic books; auto-redirects after 3 sec in view) */}
      {/* ========================================================================= */}
      <motion.section
        className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-12 py-24 text-center"
        style={{
          background: '#0d0d0d',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
        onViewportEnter={handleSection5InView}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Massive Red Statement with clip-path reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(5rem, 13vw, 13rem)',
              color: '#E63E37',
              lineHeight: 0.88,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: 0,
              textShadow: '5px 5px 0 #000, -2px -2px 0 #000',
            }}
          >
            Not the
            <br />
            hero type.
          </p>
        </motion.div>

        {/* Subtitle Statement */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)',
              color: '#ffffff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: 0,
              lineHeight: 1.2,
              textShadow: '2px 2px 0 #000',
            }}
          >
            But I build the things
            <br />
            <span style={{ color: '#E63E37' }}>they rely on.</span>
          </p>
        </motion.div>

        {/* Action Button: Zooming to Projects (Automatic after 3s, or click immediately) */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={triggerZoomToProjects}
            className="group relative px-8 py-4 uppercase font-audiowide font-bold text-sm sm:text-base tracking-widest cursor-pointer transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
            style={{
              background: '#E63E37',
              color: '#ffffff',
              border: '3px solid #1a0a0b',
              boxShadow: '5px 5px 0 #1a0a0b',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              Explore Projects
              <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
            </span>
          </button>
          <span className="text-[10px] sm:text-xs text-white/40 font-mono tracking-wider uppercase">
            Auto-zooming in 3s...
          </span>
        </motion.div>
      </motion.section>

      {/* ======================================================== */}
      {/* MULTIVERSE FLASH OVERLAY (TRIGGERED ON EXPLORE PROJECTS)  */}
      {/* ======================================================== */}
      {isZooming && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
          style={{ animation: 'multiverse-flash 0.6s ease-out forwards' }}
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
            }}
          />

          <div
            className="glitch-multiverse"
            data-text="ZOOMING TO PROJECTS"
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              color: '#ffffff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 1,
            }}
          >
            ZOOMING TO PROJECTS
          </div>

          <p
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              margin: 0,
              position: 'relative',
              zIndex: 1,
              animation: 'pulse-opacity 0.7s ease-in-out infinite alternate',
            }}
          >
            entering the multiverse...
          </p>
        </div>
      )}
    </div>
  );
};
