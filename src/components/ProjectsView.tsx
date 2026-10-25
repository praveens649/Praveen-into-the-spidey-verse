import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';


interface ProjectItem {
  id: string;
  issueNo: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  accentColor: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'sonic',
    issueNo: '01',
    category: 'AI MUSIC IDENTITY GENERATOR',
    title: 'SONIC AI PROFILER',
    description:
      'AI-driven application that analyzes playlist metadata to generate personalized music identity cards and psychological profiles. Features a high-efficiency architecture reducing LLM token consumption by 95% through template injection.',
    highlights: [
      'Engineered multi-model pipeline with Google ADK, FastMCP, and LiteLLM.',
      'Groq-powered high-speed inference with Gemini multimodal fallback.',
      'Single-pass Spotify metadata extraction and canvas card rendering.',
    ],
    tech: ['Next.js', 'FastMCP', 'LiteLLM', 'Google ADK', 'Groq / Gemini'],
    image: '/stitch_contact_jam_cosmic_portfolio/a_futuristic_abstract_representation_of_ai_music_analysis._glowing_digital/screen.png',
    githubUrl: 'https://github.com/praveens649/Sonic-Music-Card-Generator',
    liveUrl: 'https://github.com/praveens649/Sonic-Music-Card-Generator',
    accentColor: '#FF4500',
  },
  {
    id: 'mazecrawler',
    issueNo: '02',
    category: 'KAGGLE MULTI-AGENT COMPETITION',
    title: 'MAZECRAWLER AGENT',
    description:
      'Autonomous multi-agent system for intelligent exploration and resource collection in a partially observable maze environment. Designed modular Python architecture enabling strategy optimization and scalable agent coordination.',
    highlights: [
      'Implemented real-time pathfinding and dynamic map reconstruction algorithms.',
      'Multi-agent decision-making for optimal resource harvesting.',
      'High-scoring competition entry on Kaggle benchmark platform.',
    ],
    tech: ['Python', 'Kaggle', 'Pathfinding', 'Multi-Agent System', 'Algorithms'],
    image: '/stitch_contact_jam_cosmic_portfolio/a_high_end_futuristic_3d_visualization_of_a_maze_exploration_ai_agent._a/screen.png',
    githubUrl: 'https://github.com/praveens649/kaggle-MazeCrawler-game-Agent',
    liveUrl: 'https://github.com/praveens649/kaggle-MazeCrawler-game-Agent',
    accentColor: '#00dce6',
  },
  {
    id: 'blogspace',
    issueNo: '03',
    category: 'FULL-STACK BLOGGING PLATFORM',
    title: 'BLOGSPACE PLATFORM',
    description:
      'A high-performance full-stack platform for creating and managing blogs with secure authentication and role-based access control. Implemented relational database schemas and CRUD operations using Supabase and PostgreSQL.',
    highlights: [
      'Relational schema design and optimized indexing in PostgreSQL.',
      'Integrated Supabase Storage for secure media assets management.',
      'Server-side rendering and static cache revalidation via Next.js App Router.',
    ],
    tech: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Drizzle ORM'],
    image: '/stitch_contact_jam_cosmic_portfolio/a_sophisticated_futuristic_3d_representation_of_a_full_stack_blogging_platform_/screen.png',
    githubUrl: 'https://github.com/praveens649/Blogs',
    liveUrl: 'https://github.com/praveens649/Blogs',
    accentColor: '#E63E37',
  },
  {
    id: 'redacted',
    issueNo: '04',
    category: 'NEURAL ORCHESTRATION HUB',
    title: 'PROJECT [REDACTED]',
    description:
      'Building a high-concurrency neural orchestration hub designed to streamline development timelines and bend visual gravity. Initiating sub-routine development for next-gen zero-gravity interface modules.',
    highlights: [
      'High-concurrency Rust backends with async event streaming.',
      'Next-generation UI shaders and WebGL particle environments.',
      'Encrypted codebase logic securing algorithmic configurations.',
    ],
    tech: ['Rust', 'Next.js', 'AI Agents', 'Edge Networks', 'WebGL'],
    image: '/projects/true_redditor.png',
    githubUrl: 'https://github.com/praveens649',
    liveUrl: 'https://github.com/praveens649',
    accentColor: '#FFB800',
  },
];

export const ProjectsView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const project = PROJECTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  return (
    <div className="relative min-h-screen w-full pt-28 pb-20 select-none overflow-hidden flex flex-col justify-between">
      {/* Background Dots */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140a24] via-[#0b0416] to-[#0a0212] z-0"></div>
      <div className="absolute inset-0 bg-halftone opacity-40 z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full my-auto">
        {/* Header Title: CHAPTER II - PROJECTS */}
        <div className="text-center mb-8">
          <p className="font-audiowide text-[10px] sm:text-xs text-white/50 tracking-[0.45em] uppercase mb-1">
            CHAPTER II
          </p>
          <h2
            className="font-bangers text-4xl sm:text-6xl text-[#E63E37] tracking-wider uppercase inline-block transform -rotate-1"
            style={{
              textShadow: '3px 3px 0px #ffffff, 6px 6px 0px #000000',
            }}
          >
            PROJECTS
          </h2>
        </div>

        {/* 6-Panel Comic Book Layout Spread */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-[#f4efe4] p-3 sm:p-5 rounded-sm border-4 border-black shadow-[10px_10px_0px_#000000] text-black"
            >
              {/* Comic Grid: 2 columns, 3 rows (6 panels) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {/* PANEL 1 (Top Left): Project Screenshot / Terminal Preview */}
                <div className="relative aspect-[16/10] bg-black rounded-sm border-3 border-black overflow-hidden group shadow-[3px_3px_0px_#000]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                  />
                  <div className="absolute top-2 left-2 bg-black/80 text-[#00f0ff] font-mono text-[9px] px-2 py-0.5 rounded border border-[#00f0ff]/40 flex items-center gap-1.5">
                    <Terminal size={11} />
                    <span>// PREVIEW // ISSUE_{project.issueNo}</span>
                  </div>
                </div>

                {/* PANEL 2 (Top Right): Category & Big Bangers Title */}
                <div className="bg-[#fcfaf7] p-4 sm:p-6 rounded-sm border-3 border-black flex flex-col justify-center shadow-[3px_3px_0px_#000]">
                  <p className="font-audiowide text-[10px] sm:text-xs text-gray-500 tracking-[0.25em] uppercase mb-1">
                    {project.category}
                  </p>
                  <h3 className="font-bangers text-3xl sm:text-5xl text-black tracking-wide leading-none uppercase">
                    {project.title}
                  </h3>
                </div>

                {/* PANEL 3 (Middle Left): Narrative Description & Highlights */}
                <div className="bg-[#fcfaf7] p-4 sm:p-6 rounded-sm border-3 border-black flex flex-col justify-between shadow-[3px_3px_0px_#000]">
                  <p className="font-grotesk text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {project.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-grotesk text-gray-700">
                        <span className="text-[#E63E37] font-bold">◆</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PANEL 4 (Middle Right): High-Contrast Comic Color Panel with Tech Tags */}
                <div
                  className="p-4 sm:p-6 rounded-sm border-3 border-black flex flex-col justify-center items-start shadow-[3px_3px_0px_#000] relative overflow-hidden"
                  style={{ backgroundColor: project.accentColor }}
                >
                  <div className="absolute inset-0 bg-comic-dots-red opacity-15 pointer-events-none"></div>

                  <p className="font-audiowide text-[10px] text-black font-bold tracking-widest uppercase mb-3 bg-white/80 px-2 py-0.5 rounded">
                    TECH STACK & CAPABILITIES
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-black text-white font-audiowide text-[10px] sm:text-xs px-3 py-1.5 rounded-sm border border-white/20 shadow-[2px_2px_0px_#ffffff]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PANEL 5 (Bottom Left): Terminal Telemetry Logs */}
                <div className="bg-[#120820] text-[#00f0ff] p-4 rounded-sm border-3 border-black font-mono text-[10px] sm:text-xs leading-relaxed flex flex-col justify-center shadow-[3px_3px_0px_#000]">
                  <div className="text-white/40 mb-1 border-b border-white/10 pb-1 flex justify-between">
                    <span>STATUS: COMPILED_PRODUCTION</span>
                    <span>SYS_LAYER: {project.issueNo}</span>
                  </div>
                  <p className="text-white/80">$ git log --oneline -n 1</p>
                  <p className="text-[#FFB800]">&gt; feat({project.id}): optimize latency and deploy to edge network</p>
                  <p className="text-green-400">&gt; build verification: PASS (0 errors)</p>
                </div>

                {/* PANEL 6 (Bottom Right): Action Buttons & Comic Panel Number */}
                <div className="bg-[#fcfaf7] p-4 sm:p-6 rounded-sm border-3 border-black flex items-center justify-between shadow-[3px_3px_0px_#000] relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="comic-box bg-black hover:bg-gray-800 text-white font-bangers text-base sm:text-lg px-4 sm:px-6 py-2 rounded-sm cursor-pointer flex items-center gap-2"
                    >
                      <Code size={16} />
                      VIEW REPO
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comic-box bg-[#E63E37] hover:bg-[#ff4f47] text-white font-bangers text-base sm:text-lg px-4 sm:px-6 py-2 rounded-sm cursor-pointer flex items-center gap-2"
                      >
                        <span>LIVE</span>
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>

                  {/* Corner Comic Issue Number */}
                  <span className="font-bangers italic text-3xl sm:text-4xl text-gray-300 select-none">
                    {project.issueNo}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Carousel Controls */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              className="comic-box bg-[#1b102c] hover:bg-[#281842] text-white font-bangers text-base sm:text-lg px-4 py-2 rounded cursor-pointer flex items-center gap-2"
            >
              <ChevronLeft size={18} />
              PREVIOUS ISSUE
            </button>

            {/* Pagination Chapter Dots */}
            <div className="flex items-center gap-2.5">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-[#E63E37] border-white scale-125 shadow-[0_0_8px_#E63E37]'
                      : 'bg-white/20 border-transparent hover:bg-white/50'
                  }`}
                  title={p.title}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="comic-box bg-[#1b102c] hover:bg-[#281842] text-white font-bangers text-base sm:text-lg px-4 py-2 rounded cursor-pointer flex items-center gap-2"
            >
              NEXT ISSUE
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
