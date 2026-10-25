import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';


export const AboutView: React.FC = () => {
  const [isMasked, setIsMasked] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<'all' | 'languages' | 'frameworks' | 'backend' | 'tools'>('all');

  const comics = [
    { id: 'miles', src: '/about/comics/miles.jpg', title: 'Spider-Man: Miles Morales #1', rotate: -18, x: -180 },
    { id: 'gwen', src: '/about/comics/gwen.jpeg', title: 'Spider-Gwen #1', rotate: -8, x: -80 },
    { id: 'peter', src: '/about/comics/peter.jpeg', title: 'The Amazing Spider-Man', rotate: 2, x: 20 },
    { id: 'noir', src: '/about/comics/noir.jpeg', title: 'Spider-Man Noir', rotate: 12, x: 120 },
    { id: 'ham', src: '/about/comics/ham.jpeg', title: 'Spider-Ham: Great Power', rotate: 22, x: 220 },
  ];

  const skills = [
    { name: 'TypeScript', level: '95%', category: 'languages', layer: '01', color: '#00f0ff', desc: 'Strict typing & enterprise architecture' },
    { name: 'Python', level: '90%', category: 'languages', layer: '02', color: '#FFB800', desc: 'AI orchestration, multi-agents, scrapers' },
    { name: 'SQL & Database Design', level: '88%', category: 'languages', layer: '03', color: '#E63E37', desc: 'Complex relational schemas & queries' },
    { name: 'Next.js (App Router)', level: '96%', category: 'frameworks', layer: '04', color: '#00f0ff', desc: 'Server components, streaming, edge caching' },
    { name: 'React', level: '95%', category: 'frameworks', layer: '05', color: '#edb1ff', desc: 'Custom hooks, virtual DOM, performance' },
    { name: 'Tailwind CSS', level: '92%', category: 'frameworks', layer: '06', color: '#00f0ff', desc: 'Responsive high-fidelity UI systems' },
    { name: 'PostgreSQL & Supabase', level: '92%', category: 'backend', layer: '07', color: '#FFB800', desc: 'Row-level security, realtime, indexing' },
    { name: 'Firebase & Cloud Auth', level: '88%', category: 'backend', layer: '08', color: '#E63E37', desc: 'Firestore, serverless rules, storage' },
    { name: 'Docker & Containers', level: '80%', category: 'tools', layer: '09', color: '#00f0ff', desc: 'Containerization, reproducible deployment' },
    { name: 'Git & GitHub CI/CD', level: '94%', category: 'tools', layer: '10', color: '#edb1ff', desc: 'Branching strategies, automated workflows' },
    { name: 'Vercel & Edge Deployment', level: '95%', category: 'tools', layer: '11', color: '#FFB800', desc: 'Global CDN, serverless functions' },
    { name: 'AI Models & MCP Pipelines', level: '90%', category: 'backend', layer: '12', color: '#E63E37', desc: 'Google ADK, FastMCP, LiteLLM, Groq' },
  ];

  const filteredSkills = activeSkillCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeSkillCategory);

  return (
    <div className="relative min-h-screen w-full pt-28 pb-32 overflow-hidden select-none">
      {/* Background with Comic Halftone Dots */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0c2c] via-[#0d0519] to-[#0a0212] z-0"></div>
      <div className="absolute inset-0 bg-halftone opacity-60 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Header Banner: ALRIGHT, LET'S DO THIS ONE MORE TIME... */}
        <motion.div
          className="comic-box bg-[#1c0d2b]/95 p-6 sm:p-10 rounded-sm border-4 border-[#2d1845] shadow-[8px_8px_0px_#000000] mb-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Halftone dot pattern in banner */}
          <div className="absolute inset-0 bg-comic-dots-red opacity-20 pointer-events-none"></div>

          <p className="font-audiowide text-[10px] sm:text-xs text-[#00f0ff] tracking-[0.4em] uppercase mb-2">
            CHAPTER 01 // ORIGIN STORY
          </p>

          <h2
            className="font-bangers text-4xl sm:text-6xl md:text-7xl text-white tracking-wider leading-none transform -rotate-1"
            style={{
              textShadow: '3px 3px 0px #E63E37, 6px 6px 0px #000000',
            }}
          >
            ALRIGHT, LET'S DO THIS ONE MORE TIME...
          </h2>
        </motion.div>

        {/* Narrative & Name Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Comic Speech Card */}
          <motion.div
            className="lg:col-span-7 comic-box bg-[#160c24] p-6 sm:p-8 rounded-sm border-3 border-white/20 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <h3 className="font-bangers text-[#E63E37] text-2xl sm:text-3xl tracking-wide uppercase">
                SOFTWARE DEVELOPER.
              </h3>
              <p className="font-bangers text-white text-xl sm:text-2xl tracking-wide uppercase leading-snug">
                I BUILD THINGS ON THE INTERNET. <br />
                AND FOR THE PAST FEW YEARS... <br />
                I'VE BEEN SWINGING BETWEEN{' '}
                <span className="text-[#E63E37] underline decoration-wavy">WEBSITES AND APPS</span>
              </p>

              <div className="pt-2 font-grotesk text-white/80 text-sm sm:text-base leading-relaxed space-y-3">
                <p>
                  My journey began in the late hours of the night, fueled by a relentless curiosity for how pure logic translates into visual poetry and functional reality.
                </p>
                <p>
                  I specialize in building zero-gravity digital interfaces, autonomous AI agent pipelines, and high-concurrency systems. When I'm not writing clean code, you can find me experimenting with new frameworks, optimizing latency, and exploring the multiverse of possibilities.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="/resume/Praveen_Resume.pdf.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-box bg-[#E63E37] hover:bg-[#ff4f47] text-white font-bangers text-base px-5 py-2.5 rounded cursor-pointer flex items-center gap-2"
                >
                  <Download size={16} />
                  DOWNLOAD RESUME
                </a>

                <div className="font-mono text-xs text-[#00f0ff] bg-black/50 px-3 py-2 rounded border border-[#00f0ff]/30">
                  CORE_FREQ: 5.2GHz // STATUS: OPERATIONAL
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Name Card Sticker & Mask/Portrait Toggle */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* The Iconic "HELLO my name is" Badge */}
            <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_#E63E37] transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Red Header Bar */}
              <div className="bg-[#E63E37] py-3 text-center px-4">
                <p className="font-bangers text-white text-3xl sm:text-4xl tracking-wider leading-none">
                  HELLO
                </p>
                <p className="font-bangers text-white/90 text-sm sm:text-base tracking-widest uppercase">
                  MY NAME IS
                </p>
              </div>

              {/* White Center with Handwritten Permanent Marker Name */}
              <div className="py-6 sm:py-8 px-4 text-center bg-white flex flex-col items-center justify-center min-h-[120px]">
                <h4 className="font-marker text-4xl sm:text-5xl text-black transform -rotate-2 select-all">
                  Praveen
                </h4>
                <p className="font-audiowide text-[10px] text-gray-500 tracking-widest uppercase mt-2">
                  FULL-STACK SOFTWARE ENGINEER
                </p>
              </div>

              {/* Bottom Red Line */}
              <div className="h-3 bg-[#E63E37]"></div>
            </div>

            {/* Interactive Mask / Portrait Switcher */}
            <div className="w-full max-w-sm comic-box bg-[#150c22] p-4 rounded-xl border border-white/20 text-center">
              <div className="flex justify-between items-center mb-3">
                <span className="font-audiowide text-xs text-white/70">SECRET IDENTITY:</span>
                <button
                  onClick={() => setIsMasked(!isMasked)}
                  className="font-bangers text-xs px-3 py-1 bg-[#E63E37] text-white rounded cursor-pointer hover:bg-[#ff4f47] transition-colors"
                >
                  {isMasked ? 'REMOVE MASK' : 'WEAR THE MASK'}
                </button>
              </div>

              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-[#E63E37] shadow-[0_0_20px_rgba(230,62,55,0.4)]">
                <img
                  src={isMasked ? '/about/masked.png' : '/me.png'}
                  alt="Developer Identity"
                  className="w-full h-full object-cover filter contrast-105 transition-all duration-500"
                />
                <div className="absolute bottom-1 left-0 right-0 bg-black/70 text-[9px] font-audiowide py-0.5 text-[#00f0ff]">
                  {isMasked ? 'SUIT PROTOCOL ACTIVE' : 'CIVILIAN IDENTITY'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Arsenal & Abilities Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b-2 border-white/10 pb-4 gap-4">
            <div>
              <p className="font-audiowide text-[10px] text-[#00f0ff] tracking-[0.3em] uppercase">
                SPIDER-SUIT SPECIFICATIONS
              </p>
              <h3 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide uppercase">
                TECHNICAL ARSENAL
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'languages', 'frameworks', 'backend', 'tools'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`font-audiowide text-[10px] px-3 py-1.5 rounded uppercase cursor-pointer transition-all ${
                    activeSkillCategory === cat
                      ? 'bg-[#E63E37] text-white font-bold shadow-md shadow-[#E63E37]/40'
                      : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSkills.map(skill => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="comic-box bg-[#150a24] p-4 rounded border border-white/10 hover:border-[#00f0ff]/50 relative group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-audiowide text-[9px] text-white/40">LAYER {skill.layer}</span>
                  <span className="font-audiowide text-xs font-bold" style={{ color: skill.color }}>
                    {skill.level}
                  </span>
                </div>

                <h4 className="font-bangers text-2xl text-white tracking-wide uppercase group-hover:text-[#00f0ff] transition-colors">
                  {skill.name}
                </h4>
                <p className="font-grotesk text-xs text-white/60 mb-3">{skill.desc}</p>

                {/* Level Bar */}
                <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-800"
                    style={{
                      width: skill.level,
                      backgroundColor: skill.color,
                      boxShadow: `0 0 10px ${skill.color}`,
                    }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Iconic Comic Book Fan Spread at the Bottom */}
        <div className="relative pt-10 pb-6 text-center overflow-hidden">
          <p className="font-audiowide text-xs text-white/40 tracking-[0.3em] uppercase mb-6">
            MULTIVERSE COMIC VAULT // ARTIFACTS
          </p>

          <div className="relative h-64 sm:h-80 flex items-center justify-center max-w-4xl mx-auto">
            {comics.map((comic) => (
              <motion.div
                key={comic.id}
                className="absolute w-36 sm:w-48 aspect-[2/3] rounded-sm overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] cursor-pointer group origin-bottom"
                style={{
                  transform: `translateX(${comic.x}px) rotate(${comic.rotate}deg)`,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  zIndex: 30,
                  boxShadow: '10px 10px 0px #E63E37',
                  transition: { duration: 0.25 },
                }}
              >
                <img
                  src={comic.src}
                  alt={comic.title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="font-bangers text-white text-xs sm:text-sm leading-tight text-left">
                    {comic.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
