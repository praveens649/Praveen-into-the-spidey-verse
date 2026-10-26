import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Code, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Authentic Spider-Verse Comic Borders & Constants
const BORDER_PANEL = '3px solid #1a0a0b';
const CARD_TILTS = ['-1.5deg', '0.8deg', '-0.4deg', '1.2deg', '-1deg', '0.6deg'];

export interface ProjectImage {
  url: string;
  label: string;
  caption?: string;
}

export interface ProjectData {
  id: string;
  issueNo: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  template: 'featured' | 'grid6' | 'banner-strip' | 'asymmetric';
  images: ProjectImage[];
  splash: {
    headline: string;
    sub?: string;
    code: string[];
  };
  links: {
    website?: string;
    github?: string;
    rules?: string; // Live API / Backend
  };
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'blood-donation-console',
    issueNo: '01',
    title: 'Blood Donation Console',
    subtitle: 'Healthcare Logistics & Emergency Network',
    description:
      'A full-stack blood donation and hospital logistics console connecting blood banks, registered donors, and critical recipients in real-time. Features role-based access control (RBAC), interactive Leaflet geospatial blood bank mapping, appointment scheduling, automated donation tracking, and emergency blood request-response pipelines with instant Resend notifications.',
    tags: ['Next.js 16', 'NestJS 12', 'PostgreSQL', 'Prisma 7', 'Leaflet', 'TanStack Query', 'Resend'],
    accentColor: '#E63E37', // Spider-Verse Blood Red / Crimson
    template: 'featured',
    images: [
      {
        url: '/projects/blooddonation/bloodapp-adminhome.png',
        label: 'Admin Console',
        caption: 'Central operations dashboard tracking inventory, donor metrics, and emergency blood requests in real time.',
      },
      {
        url: '/projects/blooddonation/bloodapp-donationcard.png',
        label: 'Donation Flow',
        caption: 'Role-based donor cards with real-time verification and hospital appointment scheduling.',
      },
      {
        url: '/projects/blooddonation/bloodapp-response.png',
        label: 'Donor Dispatch',
        caption: 'Emergency blood request and donor response pipeline with rapid radius dispatch.',
      },
    ],
    splash: {
      headline: 'BLOOD\nDISPATCH',
      sub: 'REAL-TIME LOGISTICS & RBAC',
      code: [
        '$ pnpm --filter server start:prod',
        '> [Nest] 8420 - Nest application initialized',
        '> [Prisma] Connected to PostgreSQL @ 5432',
        '>>> POST /api/v1/blood-requests',
        '> Emergency blood request dispatched (O-Negative)',
        '> Notifying nearest 14 donors via Leaflet GeoQuery...',
        '> 200 OK - 8 donors responded in 90s',
      ],
    },
    links: {
      website: 'https://doodleblue-3.netlify.app',
      github: 'https://github.com/Sankar-web-dev/Doodleblue-3',
      rules: 'https://doodleblue-3.onrender.com',
    },
  },
  {
    id: 'cool-gamestore',
    issueNo: '02',
    title: 'Cool GameStore',
    subtitle: 'Interactive 3D Gaming & Subscription Platform',
    description:
      'A full-stack game membership and booking platform built with Next.js 16 and NestJS 12. Supports interactive Three.js 3D game discovery, monthly/yearly membership subscriptions via Stripe Checkout, automated webhook synchronization, session verification, calendar booking management, and high-performance caching powered by Redis.',
    tags: ['Next.js 16', 'NestJS 12', 'Three.js', 'Stripe Subscriptions', 'PostgreSQL', 'Prisma 7', 'Redis'],
    accentColor: '#9945FF', // Neon Spider-Verse Violet
    template: 'grid6',
    images: [
      {
        url: '/projects/gamestore/game-hero.png',
        label: '3D Game Arena',
        caption: 'Immersive Three.js WebGL hero showcase with real-time interactive game portal.',
      },
      {
        url: '/projects/gamestore/game-list.png',
        label: 'Game Catalog',
        caption: 'High-concurrency game catalog filter backed by Redis caching and Prisma queries.',
      },
      {
        url: '/projects/gamestore/game-membership.png',
        label: 'VIP Membership',
        caption: 'Monthly & yearly Stripe subscription tiers with automated webhook status synchronization.',
      },
    ],
    splash: {
      headline: '3D STORE\n& STRIPE',
      sub: 'HIGH CONCURRENCY & REDIS',
      code: [
        '$ stripe listen --forward-to localhost:5000/webhook',
        '> 200 OK [checkout.session.completed]',
        '> Customer: cust_92xL7 (Tier: Platinum VIP)',
        '>>> Redis Cache HIT: key=catalog:games:top10 (0.4ms)',
        '>>> Three.js WebGL Renderer: 60 FPS',
        '> Stripe subscription synchronized to Prisma',
      ],
    },
    links: {
      website: 'https://doodleblue4.netlify.app',
      github: 'https://github.com/Sankar-web-dev/doodleblue4',
      rules: 'https://doodleblue4.onrender.com',
    },
  },
  {
    id: 'campus-lms',
    issueNo: '03',
    title: 'Campus LMS',
    subtitle: 'Role-Aware Academic & Club Operations',
    description:
      'A full-stack campus and community management platform with role-aware workflows for universities. Handles multi-level event approval hierarchies, club memberships, QR attendance tracking, automated certificate issuance, session-based route security via connect-mongo, and interactive Swagger documentation.',
    tags: ['Next.js App Router', 'Express 5', 'MongoDB', 'Mongoose', 'Radix UI', 'Zustand', 'Swagger'],
    accentColor: '#00DCE6', // Electric Multiverse Cyan
    template: 'banner-strip',
    images: [
      {
        url: '/projects/lms/lms-dashboard.png',
        label: 'Analytics Dashboard',
        caption: 'Role-aware university operations dashboard tracking attendance, event approvals, and registrations.',
      },
      {
        url: '/projects/lms/lms-users.png',
        label: 'User Directory',
        caption: 'Role-based access matrix managing club organizers, student attendees, and super-administrators.',
      },
    ],
    splash: {
      headline: 'CAMPUS\nOPERATIONS',
      sub: 'EXPRESS 5 + MONGODB',
      code: [
        '$ pnpm --filter server dev',
        '> [Express] Server listening on port 5000',
        '> Session store: connect-mongo active',
        '>>> POST /api/v1/events/approve-workflow',
        '> Event "TechSymposium 2026" approved by SuperAdmin',
        '> Generating dynamic PDF certificates via Resend...',
        '> 201 Created - Attendance & certificates synced',
      ],
    },
    links: {
      website: 'https://doodle-blue-2.vercel.app',
      github: 'https://github.com/Sankar-web-dev/DoodleBlue-2',
      rules: 'https://doodleblue-2.onrender.com',
    },
  },
  {
    id: 'solohub',
    issueNo: '04',
    title: 'Solohub',
    subtitle: 'GitHub Control Center for Solo Developers',
    description:
      'A high-productivity GitHub control center built as a Manifest V3 Chrome Extension. Puts your active repositories, commit streaks, PR velocity, issue tracking, and notification inbox right into the browser toolbar. Features instant Ctrl+K command palette, zero-backend Direct PAT authentication with rate-limit tracking, and optional OAuth 2.0 flow.',
    tags: ['React 19', 'TypeScript', 'Chrome Manifest V3', 'Tailwind CSS', 'TanStack Query', 'Vite 8'],
    accentColor: '#FFB800', // Electric Amber / Comic Yellow
    template: 'asymmetric',
    images: [
      {
        url: '/projects/github-productivityconsole-extension/homepage.png',
        label: 'Toolbar Popup',
        caption: 'Instant browser action center displaying commit velocity, PR review requests, and quick profile stats.',
      },
      {
        url: '/projects/github-productivityconsole-extension/repo.png',
        label: 'Repo Inspector',
        caption: 'Comprehensive repository explorer with commit history, issue tracker, and branch switcher.',
      },
    ],
    splash: {
      headline: 'SOLOHUB\nTOOLBAR',
      sub: 'MANIFEST V3 + GITHUB REST',
      code: [
        '$ pnpm --filter extension build',
        '> Chrome Manifest V3 bundled via @crxjs/vite-plugin',
        '>>> chrome.storage.local: PAT authenticated',
        '>>> GitHub REST API: 5,000 req/hr remaining',
        '> Action Center: 3 PR review requests, 0 CI failures',
        '> Command Palette: Ctrl+K ready',
      ],
    },
    links: {
      website: 'https://github.com/praveens649/solohub',
      github: 'https://github.com/praveens649/solohub',
    },
  },
];

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

// 1. Comic Image Panel with Halftone Screen-Tone Dots & Interactive Switcher Tabs
function ComicImagePanel({
  images,
  color,
  defaultIndex = 0,
  onExpand,
}: {
  images?: ProjectImage[];
  color: string;
  defaultIndex?: number;
  onExpand?: (index: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);

  // Sync if defaultIndex changes
  useEffect(() => {
    setCurrentIndex(defaultIndex);
  }, [defaultIndex]);

  if (!images || images.length === 0) return null;

  const activeImg = images[currentIndex] || images[0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0a0a14',
      }}
      className="group"
    >
      <img
        src={activeImg.url}
        alt={activeImg.label}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
          transition: 'transform 0.4s ease, opacity 0.25s ease',
        }}
        className="group-hover:scale-105"
      />

      {/* Authentic Comic Halftone Screen-Tone Dots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Multiply Color Tint matching the project accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `${color}14`,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        }}
      />

      {/* Comic Corner Badge / Label */}
      <div
        style={{
          position: 'absolute',
          top: '0.45rem',
          left: '0.5rem',
          background: 'rgba(10, 2, 18, 0.92)',
          border: '1.5px solid #1a0a0b',
          borderRadius: '2px',
          padding: '0.15rem 0.45rem',
          fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
          fontSize: 'clamp(0.46rem, 0.55vw, 0.55rem)',
          color: color,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          boxShadow: '1px 1px 0 #1a0a0b',
          zIndex: 10,
        }}
      >
        // {activeImg.label}
      </div>

      {/* Top-Right Screenshot Switcher Tabs & Zoom Button */}
      <div
        style={{
          position: 'absolute',
          top: '0.42rem',
          right: '0.45rem',
          display: 'flex',
          gap: '0.3rem',
          zIndex: 10,
        }}
      >
        {images.length > 1 &&
          images.map((img, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={img.url}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                title={img.label}
                style={{
                  background: isSelected ? color : 'rgba(10, 2, 18, 0.88)',
                  color: isSelected ? '#0d0d0d' : '#f0f0ec',
                  border: '1.5px solid #1a0a0b',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
                  fontSize: 'clamp(0.44rem, 0.52vw, 0.54rem)',
                  padding: '0.14rem 0.38rem',
                  cursor: 'pointer',
                  fontWeight: 700,
                  boxShadow: '1px 1px 0 #1a0a0b',
                  transition: 'all 0.15s ease',
                  letterSpacing: '0.04em',
                }}
              >
                {idx + 1}
              </button>
            );
          })}

        {onExpand && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand(currentIndex);
            }}
            title="Expand Screenshot"
            style={{
              background: 'rgba(10, 2, 18, 0.88)',
              color: '#f0f0ec',
              border: '1.5px solid #1a0a0b',
              borderRadius: '2px',
              padding: '0.18rem 0.35rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '1px 1px 0 #1a0a0b',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#f0f0ec';
            }}
          >
            <Maximize2 size={11} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </div>
  );
}

// 2. Terminal Code Lines Block with Scanline Overlay
function CodeTerminal({ lines, color }: { lines: string[]; color: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0a0a14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0.8rem 0.9rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Neon Left Border Indicator */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: color,
        }}
      />
      {/* CRT Scanline Texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)',
          pointerEvents: 'none',
        }}
      />
      {lines.map((line, idx) => (
        <div
          key={idx}
          style={{
            fontFamily: 'var(--font-mono, "Fira Code", monospace)',
            fontSize: 'clamp(0.58rem, 0.78vw, 0.72rem)',
            color:
              line.startsWith('$') || line.startsWith('>>>')
                ? color
                : line.startsWith('>')
                ? `${color}dd`
                : line === ''
                ? 'transparent'
                : '#e0ddd866',
            lineHeight: 1.6,
            paddingLeft: '0.6rem',
            letterSpacing: '0.02em',
            whiteSpace: 'pre',
          }}
        >
          {line || ' '}
        </div>
      ))}
    </div>
  );
}

// 3. Comic Tech Tags
function ComicTags({ tags, onDark }: { tags: string[]; onDark?: boolean }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            background: onDark ? '#ffffff14' : '#1a0a0b',
            color: onDark ? '#e8e8e0' : '#f0f0ec',
            fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
            fontSize: 'clamp(0.52rem, 0.6vw, 0.64rem)',
            padding: '0.22rem 0.5rem',
            border: `1.5px solid ${onDark ? '#ffffff22' : '#1a0a0b'}`,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

// 4. Authentic Comic Action Buttons
function ComicActionLinks({
  links,
  accent,
  onDark,
}: {
  links: ProjectData['links'];
  accent: string;
  onDark?: boolean;
}) {
  const items = [
    links.website && { href: links.website, label: 'Live App', isLive: true },
    links.rules && { href: links.rules, label: 'API Server', isLive: false },
    links.github && { href: links.github, label: 'GitHub', isLive: false },
  ].filter(Boolean) as { href: string; label: string; isLive: boolean }[];

  if (items.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <span
        style={{
          fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
          fontSize: 'clamp(0.48rem, 0.55vw, 0.56rem)',
          color: onDark ? '#ffffff66' : '#1a0a0b77',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
        }}
      >
        <span>LAUNCH DISPATCH</span>
        <ExternalLink size={10} strokeWidth={2.4} />
      </span>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {items.map(({ href, label, isLive }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: isLive ? accent : '#1a0a0b',
              color: isLive ? '#0d0d0d' : '#ffffff',
              fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
              fontSize: 'clamp(0.6rem, 0.72vw, 0.72rem)',
              padding: '0.36rem 0.85rem',
              border: '2px solid #1a0a0b',
              boxShadow: '2px 2px 0 #1a0a0b',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0 #1a0a0b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '2px 2px 0 #1a0a0b';
            }}
          >
            {label === 'GitHub' ? <Code size={12} /> : <ExternalLink size={12} />}
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4 REVERSE ENGINEERED TEMPLATES (With Real Screenshots & Code Terminals)
// ---------------------------------------------------------------------------

// TEMPLATE 1: Featured (Project 1: Blood Donation Console)
function TemplateFeatured({ p, onExpand }: { p: ProjectData; onExpand: (imgIdx: number) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr',
        gridTemplateRows: 'auto 1fr 1fr',
        gridTemplateAreas: '"header header" "lt rt" "lb rb"',
        gap: '6px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Top Banner Header */}
      <div
        data-panel="true"
        style={{
          gridArea: 'header',
          background: p.accentColor,
          border: BORDER_PANEL,
          padding: '0.65rem 1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.9rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)',
              color: '#1a0a0b',
              letterSpacing: '0.05em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            {p.title}
          </h2>
          <span
            style={{
              fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
              fontSize: 'clamp(0.58rem, 0.8vw, 0.74rem)',
              color: '#1a0a0bcc',
              letterSpacing: '0.1em',
            }}
          >
            / {p.subtitle}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-bangers, "Bangers", cursive)',
            fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
            color: '#1a0a0b66',
          }}
        >
          {p.issueNo}
        </span>
      </div>

      {/* Left Top: Real Dashboard Screenshot with Halftone Texture & Switcher */}
      <div data-panel="true" style={{ gridArea: 'lt', border: BORDER_PANEL, overflow: 'hidden' }}>
        <ComicImagePanel images={p.images} defaultIndex={0} color={p.accentColor} onExpand={onExpand} />
      </div>

      {/* Right Top: Real-Time Live Code Terminal */}
      <div data-panel="true" style={{ gridArea: 'rt', border: BORDER_PANEL, overflow: 'hidden' }}>
        <CodeTerminal lines={p.splash.code} color={p.accentColor} />
      </div>

      {/* Left Bottom: Tags & Action Buttons on Dark Panel */}
      <div
        data-panel="true"
        style={{
          gridArea: 'lb',
          background: '#0d0d0d',
          border: BORDER_PANEL,
          padding: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          justifyContent: 'center',
        }}
      >
        <ComicTags tags={p.tags} onDark={true} />
        <ComicActionLinks links={p.links} accent={p.accentColor} onDark={true} />
      </div>

      {/* Right Bottom: Narrative Description */}
      <div
        data-panel="true"
        style={{
          gridArea: 'rb',
          background: '#f5f5f0',
          border: BORDER_PANEL,
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(0.68rem, 1vw, 0.88rem)',
            color: '#1a0a0b',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {p.description}
        </p>
      </div>
    </div>
  );
}

// TEMPLATE 2: Grid6 (Project 2: Cool GameStore)
function TemplateGrid6({ p, onExpand }: { p: ProjectData; onExpand: (imgIdx: number) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gridTemplateAreas: '"a b" "c d" "e f"',
        gap: '6px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Panel A: 3D Gaming Store Hero Screenshot */}
      <div data-panel="true" style={{ gridArea: 'a', border: BORDER_PANEL, overflow: 'hidden' }}>
        <ComicImagePanel images={p.images} defaultIndex={0} color={p.accentColor} onExpand={onExpand} />
      </div>

      {/* Panel B: Title & Subtitle */}
      <div
        data-panel="true"
        style={{
          gridArea: 'b',
          background: '#f5f5f0',
          border: BORDER_PANEL,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
            fontSize: 'clamp(0.56rem, 0.72vw, 0.7rem)',
            color: '#666',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '0.3rem',
            margin: 0,
          }}
        >
          {p.subtitle}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bangers, "Bangers", cursive)',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            color: '#1a0a0b',
            lineHeight: 1,
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          {p.title}
        </h2>
      </div>

      {/* Panel C: Narrative on Dark Panel */}
      <div
        data-panel="true"
        style={{
          gridArea: 'c',
          background: '#0d0d0d',
          border: BORDER_PANEL,
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(0.66rem, 0.98vw, 0.86rem)',
            color: '#e0ddd8',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {p.description}
        </p>
      </div>

      {/* Panel D: Tags & High-Concurrency Specs (Replaces blank space with live telemetry) */}
      <div
        data-panel="true"
        style={{
          gridArea: 'd',
          background: p.accentColor,
          border: BORDER_PANEL,
          padding: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '0.45rem',
        }}
      >
        <ComicTags tags={p.tags} onDark={false} />
        <div
          style={{
            background: '#1a0a0b',
            padding: '0.35rem 0.6rem',
            border: '1.5px solid #1a0a0b',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.62rem', color: '#00DCE6' }}>
            STRIPE: WEBHOOK 200 OK
          </span>
          <span style={{ fontFamily: 'var(--font-audiowide, monospace)', fontSize: '0.55rem', color: '#f0f0ec' }}>
            REDIS: HIT (0.4ms)
          </span>
        </div>
      </div>

      {/* Panel E: Game Catalog & VIP Membership Screenshot (Matching original function b) */}
      <div data-panel="true" style={{ gridArea: 'e', border: BORDER_PANEL, overflow: 'hidden' }}>
        <ComicImagePanel images={p.images} defaultIndex={1} color={p.accentColor} onExpand={onExpand} />
      </div>

      {/* Panel F: Action Buttons on Light Panel */}
      <div
        data-panel="true"
        style={{
          gridArea: 'f',
          background: '#f5f5f0',
          border: BORDER_PANEL,
          padding: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ComicActionLinks links={p.links} accent={p.accentColor} onDark={false} />
      </div>
    </div>
  );
}

// TEMPLATE 3: Banner-Strip (Project 3: Campus LMS)
function TemplateBannerStrip({ p, onExpand }: { p: ProjectData; onExpand: (imgIdx: number) => void }) {
  const topTags = p.tags.slice(0, 6);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '2.5fr auto 2fr',
        gap: '6px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Top Banner: Real Campus LMS Dashboard & Directory Screenshots with Switcher */}
      <div data-panel="true" style={{ border: BORDER_PANEL, overflow: 'hidden' }}>
        <ComicImagePanel images={p.images} defaultIndex={0} color={p.accentColor} onExpand={onExpand} />
      </div>

      {/* Middle Strip: Alternating Accent/Dark Tech Tags */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${topTags.length || 4}, 1fr)`,
          gap: '6px',
        }}
      >
        {topTags.map((t, idx) => (
          <div
            key={t}
            data-panel="true"
            style={{
              border: BORDER_PANEL,
              background: idx % 2 === 0 ? p.accentColor : '#0d0d0d',
              padding: '0.4rem 0.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '2.6rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
                fontSize: 'clamp(0.52rem, 0.65vw, 0.64rem)',
                color: idx % 2 === 0 ? '#0d0d0d' : p.accentColor,
                textAlign: 'center',
                letterSpacing: '0.04em',
                fontWeight: 700,
              }}
            >
              {t}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Grid: 2 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {/* Left: Narrative Description */}
        <div
          data-panel="true"
          style={{
            border: BORDER_PANEL,
            background: '#f5f5f0',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              color: '#1a0a0b',
              lineHeight: 1,
              marginBottom: '0.4rem',
              letterSpacing: '0.04em',
            }}
          >
            {p.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(0.66rem, 0.98vw, 0.86rem)',
              color: '#333',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {p.description}
          </p>
        </div>

        {/* Right: Code Terminal & Action Links */}
        <div
          data-panel="true"
          style={{
            border: BORDER_PANEL,
            background: p.accentColor,
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.7rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
              fontSize: 'clamp(0.58rem, 0.75vw, 0.74rem)',
              color: '#1a0a0b',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 700,
            }}
          >
            {p.subtitle}
          </p>
          <ComicActionLinks links={p.links} accent="#f5f5f0" />
        </div>
      </div>
    </div>
  );
}

// TEMPLATE 4: Asymmetric (Project 4: Solohub)
function TemplateAsymmetric({ p, onExpand }: { p: ProjectData; onExpand: (imgIdx: number) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '2fr auto 1.5fr',
        gap: '6px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Row 1: Asymmetric 3fr / 2fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '6px' }}>
        {/* Left (3fr): Solohub Chrome Extension Toolbar Screenshot with Switcher */}
        <div data-panel="true" style={{ border: BORDER_PANEL, overflow: 'hidden' }}>
          <ComicImagePanel images={p.images} defaultIndex={0} color={p.accentColor} onExpand={onExpand} />
        </div>

        {/* Right (2fr): Header Banner with Comic Terminal Preview */}
        <div
          data-panel="true"
          style={{
            background: p.accentColor,
            border: BORDER_PANEL,
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
                fontSize: 'clamp(0.54rem, 0.62vw, 0.68rem)',
                color: '#1a0a0bcc',
                letterSpacing: '0.12em',
                marginBottom: '0.2rem',
                margin: 0,
              }}
            >
              {p.subtitle}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                fontSize: 'clamp(1.5rem, 3vw, 2.6rem)',
                color: '#1a0a0b',
                lineHeight: 1,
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              {p.title}
            </h2>
          </div>

          {/* Mini Inset Terminal Log to populate panel symmetrically */}
          <div
            style={{
              background: '#0d0d0d',
              padding: '0.45rem 0.65rem',
              border: '2px solid #1a0a0b',
              boxShadow: '2px 2px 0 #1a0a0b',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.62rem', color: p.accentColor }}>
              $ chrome.storage.local.get(['github_pat'])
            </div>
            <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.58rem', color: '#e0ddd8aa' }}>
              &gt; Direct GitHub API Mode · 5,000 req/hr
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Comic Ribbon Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '6px', alignItems: 'stretch' }}>
        <div data-panel="true" style={{ background: '#0d0d0d', border: BORDER_PANEL, minHeight: '2.5rem' }} />
        <div
          data-panel="true"
          style={{
            background: '#f5f5f0',
            border: BORDER_PANEL,
            padding: '0.28rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'clamp(0.85rem, 1.6vw, 1.2rem)',
              color: '#1a0a0b',
              letterSpacing: '0.12em',
            }}
          >
            ◆ CHROME EXTENSION MANIFEST V3 ◆
          </span>
        </div>
        <div data-panel="true" style={{ background: '#0d0d0d', border: BORDER_PANEL, minHeight: '2.5rem' }} />
      </div>

      {/* Row 3: Narrative & Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <div
          data-panel="true"
          style={{
            background: '#0d0d0d',
            border: BORDER_PANEL,
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(0.66rem, 1vw, 0.88rem)',
              color: '#e0ddd8',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {p.description}
          </p>
        </div>

        <div
          data-panel="true"
          style={{
            background: '#f5f5f0',
            border: BORDER_PANEL,
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '0.6rem',
          }}
        >
          <ComicTags tags={p.tags} onDark={false} />
          <ComicActionLinks links={p.links} accent={p.accentColor} onDark={false} />
        </div>
      </div>
    </div>
  );
}

// Mobile Responsive Comic Card
function MobileComicCard({ p, onExpand }: { p: ProjectData; onExpand: (imgIdx: number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', height: '100%' }}>
      {/* Header */}
      <div
        data-panel="true"
        style={{
          background: p.accentColor,
          border: BORDER_PANEL,
          padding: '0.55rem 0.85rem',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
            fontSize: 'clamp(0.54rem, 2.2vw, 0.65rem)',
            color: '#1a0a0bcc',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 0.15rem 0',
          }}
        >
          {p.subtitle}
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-bangers, "Bangers", cursive)',
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            color: '#1a0a0b',
            lineHeight: 1,
            letterSpacing: '0.04em',
            margin: 0,
          }}
        >
          {p.title}
        </h2>
      </div>

      {/* Middle: Real Screenshot Preview with Halftone Texture & Switcher */}
      <div data-panel="true" style={{ border: BORDER_PANEL, flex: '2 1 0', overflow: 'hidden', minHeight: 0 }}>
        <ComicImagePanel images={p.images} defaultIndex={0} color={p.accentColor} onExpand={onExpand} />
      </div>

      {/* Description */}
      <div
        data-panel="true"
        style={{
          background: '#0d0d0d',
          border: BORDER_PANEL,
          padding: '0.65rem 0.85rem',
          flex: '1 1 0',
          overflow: 'hidden',
          minHeight: 0,
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
            fontSize: 'clamp(0.7rem, 2.8vw, 0.85rem)',
            color: '#e0ddd8',
            lineHeight: 1.55,
            margin: 0,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {p.description}
        </p>
      </div>

      {/* Bottom: Tags & Actions */}
      <div
        data-panel="true"
        style={{
          background: '#f5f5f0',
          border: BORDER_PANEL,
          padding: '0.6rem 0.85rem',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <ComicTags tags={p.tags.slice(0, 4)} onDark={false} />
        <ComicActionLinks links={p.links} accent={p.accentColor} onDark={false} />
      </div>
    </div>
  );
}

// Template Switcher
function ProjectTemplateRenderer({
  project,
  isMobile,
  onExpand,
}: {
  project: ProjectData;
  isMobile: boolean;
  onExpand: (imgIdx: number) => void;
}) {
  if (isMobile) {
    return <MobileComicCard p={project} onExpand={onExpand} />;
  }

  switch (project.template) {
    case 'featured':
      return <TemplateFeatured p={project} onExpand={onExpand} />;
    case 'grid6':
      return <TemplateGrid6 p={project} onExpand={onExpand} />;
    case 'banner-strip':
      return <TemplateBannerStrip p={project} onExpand={onExpand} />;
    case 'asymmetric':
      return <TemplateAsymmetric p={project} onExpand={onExpand} />;
    default:
      return <TemplateFeatured p={project} onExpand={onExpand} />;
  }
}

// ---------------------------------------------------------------------------
// MAIN PROJECTS VIEW (Interactive Fullscreen Scroll-Snap Comic Spread)
// ---------------------------------------------------------------------------
export const ProjectsView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Modal Lightbox State
  const [lightbox, setLightbox] = useState<{
    projectIndex: number;
    imageIndex: number;
  } | null>(null);

  // Track window resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to observe each project section and trigger animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll<HTMLElement>('[data-project-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute('data-index') ?? 0);
          setActiveIndex(idx);
        });
      },
      { threshold: 0.45, root: container }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation (Arrow keys + Escape for modal)
  const scrollToIndex = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const target = containerRef.current.querySelectorAll<HTMLElement>('[data-project-section]')[idx];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox) {
        const currentProj = PROJECTS[lightbox.projectIndex];
        if (e.key === 'Escape') {
          setLightbox(null);
        } else if (e.key === 'ArrowRight') {
          setLightbox((prev) =>
            prev
              ? {
                  ...prev,
                  imageIndex: (prev.imageIndex + 1) % currentProj.images.length,
                }
              : null
          );
        } else if (e.key === 'ArrowLeft') {
          setLightbox((prev) =>
            prev
              ? {
                  ...prev,
                  imageIndex: (prev.imageIndex - 1 + currentProj.images.length) % currentProj.images.length,
                }
              : null
          );
        }
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(PROJECTS.length - 1, activeIndex + 1);
        scrollToIndex(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(0, activeIndex - 1);
        scrollToIndex(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, scrollToIndex, lightbox]);

  const activeProject = lightbox ? PROJECTS[lightbox.projectIndex] : null;
  const activeImage = lightbox && activeProject ? activeProject.images[lightbox.imageIndex] : null;

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#08010f',
        backgroundImage: 'radial-gradient(#ffffff0a 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        position: 'relative',
      }}
      className="select-none"
    >
      {/* 1. Fixed Right Side Comic Navigation Dots */}
      <nav
        style={{
          position: 'fixed',
          right: '1.4rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          alignItems: 'center',
        }}
      >
        {PROJECTS.map((proj, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => scrollToIndex(idx)}
              title={proj.title}
              style={{
                width: isActive ? '13px' : '8px',
                height: isActive ? '13px' : '8px',
                borderRadius: '50%',
                background: isActive ? proj.accentColor : '#ffffff22',
                border: `2px solid ${isActive ? proj.accentColor : '#ffffff44'}`,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                padding: 0,
                outline: 'none',
                boxShadow: isActive ? `0 0 10px ${proj.accentColor}` : 'none',
              }}
            />
          );
        })}
      </nav>

      {/* 2. Project Sections List (Scroll-Snap) */}
      {PROJECTS.map((project, idx) => (
        <section
          key={project.id}
          data-project-section="true"
          data-index={idx}
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(4.8rem, 7.5vh, 5.8rem) clamp(1rem, 4vw, 3rem) 2rem',
            position: 'relative',
          }}
        >
          {/* Giant Background Ghost Comic Issue Number */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-bangers, "Bangers", cursive)',
              fontSize: 'min(55vw, 55vh)',
              color: `${project.accentColor}09`,
              letterSpacing: '-0.05em',
              userSelect: 'none',
              pointerEvents: 'none',
              lineHeight: 1,
              overflow: 'hidden',
            }}
          >
            {project.issueNo}
          </div>

          {/* Authentic Comic Book Page Spread Container */}
          <div
            style={{
              position: 'relative',
              width: 'min(900px, 88vw)',
              height: 'min(640px, 82vh)',
              background: '#ece9e0',
              border: '4px solid #1a0a0b',
              boxShadow: `10px 10px 0 rgba(0,0,0,0.8), 0 0 55px ${project.accentColor}1a`,
              padding: '6px',
              transform: isMobile ? 'none' : `rotate(${CARD_TILTS[idx % CARD_TILTS.length]})`,
              transition: isMobile ? 'none' : 'transform 0.35s ease, box-shadow 0.35s ease',
              zIndex: 1,
            }}
            onMouseEnter={
              isMobile
                ? undefined
                : (e) => {
                    const card = e.currentTarget;
                    card.style.transform = 'rotate(0deg) scale(1.012)';
                    card.style.boxShadow = `14px 14px 0 rgba(0,0,0,0.85), 0 0 65px ${project.accentColor}2a`;
                  }
            }
            onMouseLeave={
              isMobile
                ? undefined
                : (e) => {
                    const card = e.currentTarget;
                    card.style.transform = `rotate(${CARD_TILTS[idx % CARD_TILTS.length]})`;
                    card.style.boxShadow = `10px 10px 0 rgba(0,0,0,0.8), 0 0 55px ${project.accentColor}1a`;
                  }
            }
          >
            {/* The Specific Comic Grid Template */}
            <ProjectTemplateRenderer
              project={project}
              isMobile={isMobile}
              onExpand={(imgIdx) => setLightbox({ projectIndex: idx, imageIndex: imgIdx })}
            />

            {/* Corner Comic Page Number */}
            <span
              style={{
                position: 'absolute',
                bottom: '0.45rem',
                right: '0.6rem',
                fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                color: '#1a0a0b30',
                letterSpacing: '0.06em',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
            >
              {project.issueNo}
            </span>
          </div>
        </section>
      ))}

      {/* 3. Authentic Spider-Verse Comic Screenshot Lightbox Modal */}
      {lightbox && activeProject && activeImage && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(8, 1, 15, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: 'min(1150px, 92vw)',
              maxHeight: '90vh',
              background: '#0a0a14',
              border: '4px solid #1a0a0b',
              boxShadow: `12px 12px 0 #1a0a0b, 0 0 60px ${activeProject.accentColor}33`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Modal Top Header Bar */}
            <div
              style={{
                background: activeProject.accentColor,
                borderBottom: '3px solid #1a0a0b',
                padding: '0.65rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-bangers, "Bangers", cursive)',
                    fontSize: '1.4rem',
                    color: '#1a0a0b',
                    letterSpacing: '0.04em',
                  }}
                >
                  {activeProject.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-audiowide, "Audiowide", monospace)',
                    fontSize: '0.68rem',
                    color: '#1a0a0bcc',
                    letterSpacing: '0.1em',
                  }}
                >
                  // {activeImage.label.toUpperCase()}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    color: '#1a0a0b',
                    fontWeight: 700,
                  }}
                >
                  [{lightbox.imageIndex + 1} / {activeProject.images.length}]
                </span>

                <button
                  onClick={() => setLightbox(null)}
                  title="Close (ESC)"
                  style={{
                    background: '#1a0a0b',
                    color: '#f0f0ec',
                    border: '2px solid #1a0a0b',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Image Display with Crisp View */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#040008',
                maxHeight: '74vh',
                overflow: 'hidden',
              }}
            >
              <img
                src={activeImage.url}
                alt={activeImage.label}
                style={{
                  maxWidth: '100%',
                  maxHeight: '74vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              {/* Prev / Next Arrows */}
              {activeProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              imageIndex:
                                (prev.imageIndex - 1 + activeProject.images.length) % activeProject.images.length,
                            }
                          : null
                      );
                    }}
                    title="Previous (Left Arrow)"
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 2, 18, 0.9)',
                      color: activeProject.accentColor,
                      border: '2px solid #1a0a0b',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '2px 2px 0 #1a0a0b',
                    }}
                  >
                    <ChevronLeft size={22} strokeWidth={2.8} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((prev) =>
                        prev
                          ? {
                              ...prev,
                              imageIndex: (prev.imageIndex + 1) % activeProject.images.length,
                            }
                          : null
                      );
                    }}
                    title="Next (Right Arrow)"
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(10, 2, 18, 0.9)',
                      color: activeProject.accentColor,
                      border: '2px solid #1a0a0b',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      boxShadow: '2px 2px 0 #1a0a0b',
                    }}
                  >
                    <ChevronRight size={22} strokeWidth={2.8} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Bottom Caption */}
            {activeImage.caption && (
              <div
                style={{
                  background: '#0d0d0d',
                  borderTop: '2px solid #1a0a0b',
                  padding: '0.65rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: '0.78rem',
                    color: '#e0ddd8',
                    margin: 0,
                  }}
                >
                  {activeImage.caption}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-audiowide, monospace)',
                    fontSize: '0.6rem',
                    color: '#888',
                    letterSpacing: '0.1em',
                  }}
                >
                  PRESS ESC TO CLOSE
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
