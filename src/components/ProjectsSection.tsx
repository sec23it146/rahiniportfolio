import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  stack: string[];
  gradient: string;
  codeHref?: string;
  liveHref?: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'AI · Digital Twin',
    name: 'AquaPure',
    description:
      'An AI-driven wastewater management platform for real-time water quality monitoring, anomaly detection, predictive analysis, treatment optimization, and intelligent decision support using digital-twin simulation.',
    stack: ['TypeScript', 'PLpgSQL', 'Python', 'Machine Learning', 'HTML', 'CSS'],
    gradient: 'linear-gradient(135deg, #0a3d4a 0%, #0c0c0c 60%, #1c5c6e 100%)',
    codeHref: 'https://github.com/sec23it146/Aquapure',
  },
  {
    number: '02',
    category: 'Full-Stack · MERN',
    name: 'NexaHome',
    description:
      'A smart home automation dashboard with secure JWT authentication, role-based access control, device management, automation rules, real-time notifications, and activity logs across Admin, Homeowner, and Guest roles.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.IO'],
    gradient: 'linear-gradient(135deg, #3d1f0a 0%, #0c0c0c 60%, #6e3c1c 100%)',
    codeHref: 'https://github.com/sec23it146/NEXAHOME',
    liveHref: 'https://nexahome-seven.vercel.app',
  },
  {
    number: '03',
    category: 'Machine Learning',
    name: 'Restaurant Rating Prediction',
    description:
      'A regression-based model that predicts restaurant ratings from structured data, built during a Machine Learning internship at Cognifyz Technologies.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook'],
    gradient: 'linear-gradient(135deg, #2a0a3d 0%, #0c0c0c 60%, #591c6e 100%)',
    codeHref: 'https://github.com/sec23it146/Restaurant-rating',
    liveHref: 'https://restaurant-rating-1-9slw.onrender.com',
  },
  {
    number: '04',
    category: 'Machine Learning',
    name: 'Restaurant Recommendation System',
    description:
      'A content-based recommendation engine that suggests restaurants using similarity across cuisine, price, and rating features.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook'],
    gradient: 'linear-gradient(135deg, #3d0a2a 0%, #0c0c0c 60%, #6e1c59 100%)',
    codeHref: 'https://github.com/sec23it146/Restaurant-Recommendation',
    liveHref: 'https://restaurant-recommendation-ed3u.onrender.com',
  },
  {
    number: '05',
    category: 'AI · Agents',
    name: 'AI Search Engine',
    description:
      'An AI-powered search agent using Groq LLM and the Tavily Search API to fetch real-time web results and generate intelligent, sourced answers.',
    stack: ['Python', 'Groq LLM', 'Tavily Search API'],
    gradient: 'linear-gradient(135deg, #0a2a3d 0%, #0c0c0c 60%, #1c4c6e 100%)',
    codeHref: 'https://github.com/sec23it146/AI-SEARCH-ENGINE',
    liveHref: 'https://huggingface.co/spaces/sec23it146/rahins_ai_search_agent',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
}

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] w-full"
      style={{ top: `${96 + index * 28}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-5 sm:gap-7 md:gap-9 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 overflow-hidden"
      >
        {/* Top row: number + meta + button */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
            >
              {project.number}
            </div>

            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: 'clamp(0.65rem, 1.2vw, 1rem)' }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2.5 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <LiveProjectButton href={project.codeHref} label="Code" />
            <LiveProjectButton href={project.liveHref} label="Live demo" />
          </div>
        </div>

        {/* Bottom: gradient art panel + description + stack */}
        <div className="flex flex-1 flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 min-h-0">
          <div
            className="relative flex-1 min-h-[160px] md:min-h-0 rounded-[32px] sm:rounded-[40px] md:rounded-[48px] overflow-hidden flex items-end p-6 sm:p-8"
            style={{ background: project.gradient }}
          >
            <span
              className="font-black uppercase text-white/10 leading-none select-none"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}
            >
              {project.name.split(' ')[0]}
            </span>
          </div>

          <div className="flex w-full md:w-[38%] shrink-0 flex-col justify-between gap-6">
            <p
              className="font-light leading-relaxed text-[#D7E2EA]/75"
              style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-xs text-[#D7E2EA]/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
