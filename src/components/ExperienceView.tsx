import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';


interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  bullets: string[];
  tools: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'marzelet',
    role: 'PROJECT LEAD INTERN',
    company: 'MARZELET INFO TECHNOLOGY',
    location: 'HYBRID',
    period: 'JUN 2026 — PRESENT',
    isCurrent: true,
    bullets: [
      'Leading the design and development of a scalable enterprise inventory management platform comprising modules for products, suppliers, warehouses, purchase orders, and analytics reporting.',
      'Architected relational database schemas and backend workflows using Supabase and PostgreSQL to ensure data integrity and high-speed query execution.',
      'Driving core system design decisions and coordinating agile development sprints to deliver reliable, production-ready full-stack software.',
    ],
    tools: ['Next.js', 'Supabase', 'PostgreSQL', 'TypeScript', 'GitHub'],
  },
  {
    id: 'webzenith',
    role: 'LEAD DEVELOPER INTERN',
    company: 'WEBZENITH SOLUTIONS',
    location: 'REMOTE',
    period: 'FEB 2025 — OCT 2025',
    isCurrent: false,
    bullets: [
      'Developed and maintained full-stack web applications using modern React ecosystems, collaborating closely with distributed teams to deliver production-quality features.',
      'Designed database schemas and implemented authentication and role-based access mechanisms (RBAC) for scalable, secure applications.',
      'Contributed across frontend and backend services while establishing Git-based development workflows and debugging complex edge cases.',
    ],
    tools: ['Next.js', 'Firebase', 'React', 'Tailwind CSS', 'Git'],
  },
  {
    id: 'multiverse',
    role: 'AI & FULL-STACK SOFTWARE DEVELOPER',
    company: 'FREELANCE & OPEN SOURCE // EARTH-1610',
    location: 'GLOBAL · REMOTE',
    period: '2024 — PRESENT',
    isCurrent: false,
    bullets: [
      'Engineered autonomous multi-agent exploration systems and LLM orchestration pipelines using Google ADK, FastMCP, and Groq inference.',
      'Built and open-sourced developer tools, AI music profilers, and high-performance web applications tested by thousands of community users.',
      'Designed intuitive, motion-rich zero-gravity user interfaces with micro-interactions and rigorous visual fidelity.',
    ],
    tools: ['Python', 'FastMCP', 'LiteLLM', 'Docker', 'Vercel', 'PostgreSQL'],
  },
];

export const ExperienceView: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full pt-28 pb-32 select-none overflow-hidden">
      {/* Background with Comic Halftone Dots */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#18092a] via-[#0d0418] to-[#0a0212] z-0"></div>
      <div className="absolute inset-0 bg-halftone opacity-50 z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Title: CHAPTER 03 - THE GRIND */}
        <div className="text-center mb-6">
          <p className="font-audiowide text-[10px] sm:text-xs text-white/50 tracking-[0.45em] uppercase mb-1">
            CHAPTER 03 — THE GRIND
          </p>
          <motion.h2
            className="font-bangers text-5xl sm:text-7xl md:text-8xl text-[#E63E37] tracking-wider uppercase inline-block transform -rotate-1"
            style={{
              textShadow: '4px 4px 0px #ffffff, 8px 8px 0px #000000',
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            EXPERIENCE
          </motion.h2>
        </div>

        {/* Comic Subtitle Banner */}
        <motion.div
          className="comic-box bg-[#1b0d28] p-4 sm:p-5 max-w-2xl mx-auto rounded-sm border-2 border-white/20 text-center mb-16 shadow-[6px_6px_0px_#000000]"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="font-bangers text-white text-lg sm:text-2xl tracking-wide uppercase leading-tight">
            EVERY LINE OF CODE. EVERY DEPLOYMENT. <br />
            EVERY BUG THAT WOKE ME UP AT 3AM.
          </p>
        </motion.div>

        {/* Experience Timeline Container */}
        <div className="relative">
          {/* Vertical Dashed Dimensional Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[#E63E37]/60 transform sm:-translate-x-1/2"></div>

          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 pl-10 sm:pl-0`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Central Timeline Dimensional Node */}
                  <div className="absolute left-4 sm:left-1/2 top-6 w-5 h-5 bg-[#0a0212] border-3 border-[#E63E37] rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_12px_#E63E37] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"></span>
                  </div>

                  {/* Spacer for 2-column alternating layout on desktop */}
                  <div className="hidden sm:block w-1/2"></div>

                  {/* Main Experience Comic Card */}
                  <div className="w-full sm:w-1/2">
                    <div className="comic-box bg-[#150a22] p-6 sm:p-7 rounded-sm border-3 border-black hover:border-[#E63E37] transition-all shadow-[6px_6px_0px_#000000] relative group">
                      {/* Top Header */}
                      <div className="mb-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="font-audiowide text-[10px] text-white/50 tracking-wider">
                            {exp.period}
                          </span>

                          <span className="font-audiowide text-[9px] bg-[#E63E37]/20 text-[#E63E37] px-2.5 py-0.5 rounded border border-[#E63E37]/40 tracking-widest uppercase">
                            {exp.location}
                          </span>
                        </div>

                        <h3 className="font-bangers text-2xl sm:text-3xl text-white tracking-wide uppercase leading-tight group-hover:text-[#00f0ff] transition-colors">
                          {exp.role}
                        </h3>

                        <h4 className="font-bangers text-lg sm:text-xl text-[#E63E37] tracking-wider italic mt-0.5">
                          {exp.company}
                        </h4>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2 mt-4">
                        {exp.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-grotesk text-white/80 leading-relaxed">
                            <span className="text-[#E63E37] font-bold text-sm mt-0.5">◆</span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tools Used Section */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                        <span className="font-audiowide text-[9px] text-white/40 uppercase mr-1">
                          STACK:
                        </span>
                        {exp.tools.map((tool) => (
                          <span
                            key={tool}
                            className="bg-black/50 text-[#00f0ff] text-[10px] font-mono px-2 py-0.5 rounded border border-[#00f0ff]/30"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Currently Here Badge */}
                      {exp.isCurrent && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-[#E63E37] text-white font-bangers text-xs px-3 py-1 rounded shadow-md shadow-[#E63E37]/40">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          CURRENTLY HERE
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-20 text-center">
          <a
            href="/resume/Praveen_Resume.pdf.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="comic-box bg-[#E63E37] hover:bg-[#ff4f47] text-white font-bangers text-xl px-8 py-4 rounded cursor-pointer inline-flex items-center gap-3 transform hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000000]"
          >
            <Download size={20} />
            <span>DOWNLOAD COMPLETE RESUME (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
