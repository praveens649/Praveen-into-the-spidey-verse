import React, { useEffect, useRef } from 'react';

export const HomeHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const fogRef = useRef<HTMLDivElement>(null);

  // Exact lively idle-sway & mouse parallax physics from the original Spider-Verse website
  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    const currentX = [0, 0, 0];
    const currentY = [0, 0, 0];
    const currentScale = [1, 1.01, 1.02];
    let lastMouseMove = Date.now();
    const startTime = Date.now();

    // Original physics parameters per layer:
    // Layer 0: Distant, gentle slow sway
    // Layer 1: Mid-ground, medium sway
    // Layer 2: Foreground, expressive lively depth sway
    const configs = [
      {
        xMax: 6,
        yMax: 3,
        lerp: 0.035,
        scaleBase: 1.01,
        scaleRange: 0.015,
        idleX: { amp: 8, freq: 0.0005 },
        idleY: { amp: 3.5, freq: 0.0004 },
      },
      {
        xMax: 14,
        yMax: 6,
        lerp: 0.05,
        scaleBase: 1.02,
        scaleRange: 0.02,
        idleX: { amp: 14, freq: 0.0007 },
        idleY: { amp: 5.5, freq: 0.0006 },
      },
      {
        xMax: 24,
        yMax: 10,
        lerp: 0.075,
        scaleBase: 1.03,
        scaleRange: 0.025,
        idleX: { amp: 22, freq: 0.0009 },
        idleY: { amp: 8.0, freq: 0.0008 },
      },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      targetY = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
      lastMouseMove = Date.now();
    };

    const updateParallax = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      // Idle factor smoothly increases if mouse stops moving for 1.5 seconds
      const idleWeight = Math.min(1, Math.max(0, (now - lastMouseMove - 1500) / 1200));

      configs.forEach((cfg, idx) => {
        const domEl = layerRefs.current[idx];
        if (!domEl) return;

        // Dynamic mouse displacement
        const mouseX = targetX * cfg.xMax;
        const mouseY = targetY * cfg.yMax;

        // Continuous lively organic sine-wave sway
        const idleX = Math.sin(elapsed * cfg.idleX.freq) * cfg.idleX.amp;
        const idleY = Math.sin(elapsed * cfg.idleY.freq) * cfg.idleY.amp;

        // Blend mouse position with idle movement
        const finalTargetX = mouseX * (1 - idleWeight * 0.7) + idleX;
        const finalTargetY = mouseY * (1 - idleWeight * 0.7) + idleY;

        // Distance from center for scale breathing
        const dist = Math.min(1, Math.hypot(targetX, targetY));
        const targetScale = cfg.scaleBase + cfg.scaleRange * dist * (1 - idleWeight) + Math.sin(elapsed * 0.0008) * 0.004;

        currentX[idx] += (finalTargetX - currentX[idx]) * cfg.lerp;
        currentY[idx] += (finalTargetY - currentY[idx]) * cfg.lerp;
        currentScale[idx] += (targetScale - currentScale[idx]) * cfg.lerp;

        domEl.style.transform = `translate(${currentX[idx].toFixed(2)}px, ${currentY[idx].toFixed(2)}px) scale(${currentScale[idx].toFixed(3)})`;
      });

      // Atmospheric breathing depth fog
      if (fogRef.current) {
        const fogOpacity = 0.75 + 0.25 * Math.sin((elapsed * Math.PI * 2) / 8000);
        fogRef.current.style.opacity = fogOpacity.toFixed(2);
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden select-none pb-20 md:pb-0"
    >
      {/* 1. Authentic Sunset Sky Gradient & Gently Drifting Clouds */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'linear-gradient(180deg, #806A89 0%, #C6949A 23%, #E5BEA4 58%, #92918D 100%)',
        }}
      >
        <img
          src="/home/clouds.png"
          alt="Clouds"
          aria-hidden="true"
          className="w-full h-full object-cover mix-blend-darken opacity-75 pointer-events-none animate-clouds-drift"
        />
      </div>

      {/* 2. Main Hero Content & City Parallax Architecture */}
      <div
        className="w-full h-screen flex flex-col items-center justify-center relative"
        style={{
          paddingBottom: 'clamp(150px, 16vh, 240px)',
          zIndex: 10,
        }}
      >
        {/* Centerpiece Display Typography: PRAVEEN & SUBTITLE */}
        <div
          className="text-center relative pointer-events-auto"
          style={{
            zIndex: 4,
            transition: 'opacity 0.4s ease',
          }}
        >
          <h1
            className="text-white leading-none select-none"
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 'clamp(5rem, 14vw, 13rem)',
              letterSpacing: '0.05em',
              display: 'inline-block',
              transform: 'skewX(-4deg)',
              textShadow: '4px 4px 0 #e63946, 8px 8px 0 rgba(0,0,0,0.35)',
              WebkitTextStroke: '1px rgba(0,0,0,0.4)',
            }}
          >
            PRAVEEN
          </h1>
          <p
            className="text-white/90 tracking-[0.3em] uppercase select-none mt-2 sm:mt-3"
            style={{
              fontFamily: 'var(--font-bangers)',
              fontSize: 'clamp(0.95rem, 2.2vw, 1.45rem)',
              textShadow: '2px 2px 0 rgba(230,57,70,0.7)',
            }}
          >
            BUILDING STUFF AND BREAKING STUFF
          </p>
        </div>

        {/* 3. Authentic 3-Layer Parallax City Skyline with Lively Organic Movement */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {/* Layer 0 (Distant Skyline): skyline3.png - bottom: 6%, zIndex: 1 */}
          <div
            ref={(el) => { layerRefs.current[0] = el; }}
            className="absolute inset-0 will-change-transform"
            style={{
              zIndex: 1,
            }}
          >
            <img
              src="/home/skyline3.png"
              alt="Layer 1"
              className="city-parallax-layer-0 absolute left-0 w-full h-auto object-bottom filter brightness-95"
              style={{
                bottom: '6%',
              }}
            />
          </div>

          {/* Atmospheric Breathing Fog Layer between Distant and Mid layers */}
          <div
            ref={fogRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              zIndex: 2,
              background: 'linear-gradient(transparent 30%, rgba(180,140,200,0.08) 68%, rgba(10,2,18,0.22) 100%)',
            }}
          />

          {/* Layer 1 (Mid Skyline): skyline2.png - bottom: 1.5%, zIndex: 3 */}
          <div
            ref={(el) => { layerRefs.current[1] = el; }}
            className="absolute inset-0 will-change-transform"
            style={{
              zIndex: 3,
            }}
          >
            <img
              src="/home/skyline2.png"
              alt="Layer 2"
              className="city-parallax-layer-1 absolute left-0 w-full h-auto object-bottom"
              style={{
                bottom: '1.5%',
              }}
            />
          </div>

          {/* Layer 2 (Front Foreground Skyline with gentle lively lighting): skyline1.png - bottom: -2.5%, zIndex: 5 */}
          <div
            ref={(el) => { layerRefs.current[2] = el; }}
            className="absolute inset-0 will-change-transform pointer-events-none"
            style={{
              zIndex: 5,
            }}
          >
            <img
              src="/home/skyline1.png"
              alt="Layer 3"
              className="city-parallax-layer-2 animate-city-lights absolute left-0 w-full h-auto object-bottom"
              style={{
                bottom: '-2.5%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
