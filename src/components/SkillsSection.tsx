import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import FadeIn from './FadeIn';

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  glow: string;
  items: SkillItem[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    glow: '#B08CFF',
    items: [
      { name: 'Python', level: 95 },
      { name: 'C', level: 60 },
      { name: 'Java', level: 50 },
      { name: 'JavaScript', level: 80 },
      { name: 'SQL', level: 90 },
    ],
  },
  {
    title: 'Web Technologies',
    glow: '#5EB8FF',
    items: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
    ],
  },
  {
    title: 'Core Concepts',
    glow: '#5EB8FF',
    items: [
      { name: 'DSA', level: 75 },
      { name: 'OOPs', level: 85 },
      { name: 'DBMS', level: 90 },
      { name: 'OS', level: 80 },
      { name: 'Agile', level: 75 },
      { name: 'Cloud Computing', level: 70 },
    ],
  },
  {
    title: 'Tools & Platforms',
    glow: '#FFB25E',
    items: [
      { name: 'VS Code', level: 95 },
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 85 },
      { name: 'Google Colab', level: 80 },
      { name: 'Hugging Face', level: 75 },
      { name: 'Vercel', level: 80 },
      { name: 'Render', level: 75 },
    ],
  },
  {
    title: 'Design Tools',
    glow: '#FF7FC6',
    items: [
      { name: 'Figma', level: 85 },
      { name: 'Canva', level: 90 },
      { name: 'Webflow', level: 65 },
    ],
  },
];

interface SkillRowProps {
  item: SkillItem;
  glow: string;
  inView: boolean;
  delay: number;
}

const SkillRow = ({ item, glow, inView, delay }: SkillRowProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 1000;
      const start = performance.now();
      let raf: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(eased * item.level));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, item.level, delay]);

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="text-sm sm:text-base font-semibold text-white">{item.name}</span>
        <span className="font-mono text-xs text-white/45 tabular-nums">{count}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="skill-fill-bar h-full rounded-full"
          style={
            {
              width: `${count}%`,
              '--glow': glow,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
};

interface CategoryBlockProps {
  category: SkillCategory;
  index: number;
}

const CategoryBlock = ({ category, index }: CategoryBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <div ref={blockRef} className={index !== 0 ? 'mt-14 sm:mt-16' : ''}>
      <FadeIn y={20}>
        <h3
          className="mb-6 sm:mb-8 text-xl sm:text-2xl font-bold"
          style={{ color: category.glow }}
        >
          {category.title}
        </h3>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-10 gap-y-7 sm:gap-y-8">
        {category.items.map((item, i) => (
          <SkillRow key={item.name} item={item} glow={category.glow} inView={inView} delay={0.08 + i * 0.1} />
        ))}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-transparent px-5 sm:px-8 md:px-12 pt-8 pb-20 sm:pb-24"
    >
      {/* subtle ambient background — kept light so content stays readable */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
        <div className="skills-wave skills-wave-1" />
        <div className="skills-wave skills-wave-2" />
      </div>

      <FadeIn y={40}>
        <h2
          className="hero-heading relative z-10 text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 120px)' }}
        >
          Skills
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="relative z-10 text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-14 sm:mb-20 text-xs sm:text-sm">
          Tools & technologies I build with
        </p>
      </FadeIn>

      <div className="relative z-10 mx-auto max-w-5xl rounded-[32px] sm:rounded-[40px] border border-white/10 bg-[#101014]/70 backdrop-blur-md px-6 sm:px-10 md:px-14 py-10 sm:py-14">
        {CATEGORIES.map((category, i) => (
          <CategoryBlock key={category.title} category={category} index={i} />
        ))}
      </div>

      <style>{`
        .skills-wave {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
        }
        .skills-wave-1 {
          top: -10%; left: -5%; width: 40vw; height: 40vw;
          background: radial-gradient(circle, #B600A8, transparent 65%);
          animation: skillsWaveMove 22s ease-in-out infinite;
        }
        .skills-wave-2 {
          bottom: -10%; right: -5%; width: 36vw; height: 36vw;
          background: radial-gradient(circle, #0A3D6E, transparent 65%);
          animation: skillsWaveMove 26s ease-in-out infinite -10s;
        }
        @keyframes skillsWaveMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, -4%) scale(1.1); }
        }
        .skill-fill-bar {
          background: linear-gradient(90deg, var(--glow), #ffffff 130%);
          box-shadow: 0 0 10px var(--glow);
          transition: width 0.15s linear;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
