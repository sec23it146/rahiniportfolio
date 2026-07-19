import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Lock, Users, Rocket, Globe2, Landmark, FileText } from 'lucide-react';
import FadeIn from './FadeIn';

interface Level {
  icon: typeof Users;
  emoji: string;
  title: string;
  detail: string;
  meta: string;
  glow: string;
}

const LEVELS: Level[] = [
  {
    icon: Users,
    emoji: '👥',
    title: 'Student Volunteer',
    detail: 'Jamboree Global Village — educated 100+ scouts on UN SDG 4: Quality Education.',
    meta: 'Global Village',
    glow: '#2FE39A',
  },
  {
    icon: Rocket,
    emoji: '🚀',
    title: 'Co-Lead',
    detail: 'Co-led the planning and execution of an industry hackathon with IBM SkillsBuild and 1M1B.',
    meta: 'HYPERNOVA 2025',
    glow: '#FFB25E',
  },
  {
    icon: Globe2,
    emoji: '🌍',
    title: 'Campus Ambassador',
    detail: 'Represented the campus and drove participation for a national IEEE symposium.',
    meta: 'IEEE CS India Symposium · 2025',
    glow: '#5EB8FF',
  },
  {
    icon: Landmark,
    emoji: '🏛️',
    title: 'Treasurer',
    detail: 'IEEE Computer Society Student Branch — managed chapter finances and supported technical events.',
    meta: '2025',
    glow: '#D69EFF',
  },
  {
    icon: FileText,
    emoji: '📄',
    title: 'Research Publication',
    detail: 'AI-ML based collaborative chatbot leveraging NLP for intelligent user interaction and automation.',
    meta: 'IEEE Conference · 2026',
    glow: '#FF7FC6',
  },
];

const AchievementsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(0);
  const [popup, setPopup] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.4'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const count = Math.min(LEVELS.length, Math.max(0, Math.ceil(v * LEVELS.length)));
    setUnlocked((prev) => {
      if (count > prev) {
        setPopup(LEVELS[count - 1]?.title ?? null);
        window.setTimeout(() => setPopup(null), 1600);
      }
      return count;
    });
  });

  return (
    <section
      id="achievements"
      className="relative w-full bg-transparent px-5 sm:px-8 md:px-10 pt-8 pb-24 sm:pb-32 overflow-hidden"
    >
      {/* Ambient floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#D7E2EA]/20"
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 17) % 100}%`,
              width: 3,
              height: 3,
              animation: `achFloat ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <FadeIn y={40}>
        <h2
          className="hero-heading relative z-10 text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 120px)' }}
        >
          🏆 Achievement Journey
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="relative z-10 text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-16 sm:mb-20 text-xs sm:text-sm">
          Scroll to unlock each level
        </p>
      </FadeIn>

      <div ref={containerRef} className="relative z-10 mx-auto max-w-2xl">
        {/* base track */}
        <div className="absolute left-[19px] sm:left-6 top-0 bottom-0 w-[3px] rounded-full bg-[#D7E2EA]/10" />
        {/* fill track */}
        <motion.div
          className="absolute left-[19px] sm:left-6 top-0 w-[3px] rounded-full"
          style={{
            height: lineHeight,
            background: 'linear-gradient(180deg, #2FE39A, #FFB25E, #5EB8FF, #D69EFF, #FF7FC6)',
            boxShadow: '0 0 12px rgba(255,255,255,0.35)',
          }}
        />

        <div className="flex flex-col gap-14 sm:gap-16">
          {LEVELS.map((level, i) => {
            const isUnlocked = i < unlocked;
            const Icon = level.icon;
            return (
              <div key={level.title} className="relative pl-14 sm:pl-20">
                {/* node badge */}
                <motion.div
                  className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2"
                  animate={{
                    scale: isUnlocked ? 1 : 0.9,
                    borderColor: isUnlocked ? level.glow : 'rgba(215,226,234,0.2)',
                    boxShadow: isUnlocked ? `0 0 22px ${level.glow}88` : '0 0 0px transparent',
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: '#0C0C0C' }}
                >
                  {isUnlocked ? (
                    <span className="text-base">{level.emoji}</span>
                  ) : (
                    <Lock size={15} className="text-[#D7E2EA]/40" />
                  )}
                </motion.div>

                <span className="mb-2 block text-[10px] uppercase tracking-widest text-[#D7E2EA]/35">
                  Level {i + 1} {isUnlocked ? '· 🔓 Unlocked' : '· 🔒 Locked'}
                </span>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{
                    opacity: isUnlocked ? 1 : 0.35,
                    x: isUnlocked ? 0 : -10,
                    borderColor: isUnlocked ? level.glow : 'rgba(215,226,234,0.12)',
                    boxShadow: isUnlocked ? `0 0 26px ${level.glow}40, 0 8px 30px rgba(0,0,0,0.35)` : '0 0 0px transparent',
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="achievement-card group relative min-h-[150px] sm:min-h-[170px] overflow-hidden rounded-[28px] sm:rounded-[32px] border-2 bg-[#141418] p-6 sm:p-8 md:p-9 hover:-translate-y-1"
                  style={{ '--glow': level.glow } as React.CSSProperties}
                >
                  <div
                    className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-20 blur-3xl"
                    style={{ background: level.glow }}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <Icon size={24} style={{ color: level.glow }} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#F2F5F7]">
                        {level.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#D7E2EA]/80">
                        {level.detail}
                      </p>
                      <span className="mt-4 block text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/45">
                        {level.meta}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Achievement Unlocked!" popup */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/15 bg-black/80 px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-white backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            🏆 Achievement Unlocked — {popup}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes achFloat {
          0% { transform: translateY(0); opacity: 0.2; }
          100% { transform: translateY(-24px); opacity: 0.6; }
        }
        .achievement-card {
          transition: transform 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default AchievementsSection;
