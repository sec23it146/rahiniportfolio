import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';
import LaptopVisual from './LaptopVisual';

const ABOUT_TEXT =
  "I'm a Python developer and B.Tech Information Technology student at Sri Sairam Engineering College, Chennai. I build full-stack and machine-learning driven products — from MERN dashboards to AI-powered platforms — and I care about turning messy real-world problems into clean, working systems. Let's build something incredible together!";

const EDUCATION = [
  {
    school: 'Sri Sairam Engineering College, Chennai',
    detail: 'B.Tech Information Technology · 2023–2027',
    meta: 'CGPA 8.63',
  },
  {
    school: 'Government Girls Higher Secondary School, Thanjavur',
    detail: 'HSC (2023) — 88.67% · SSLC (2021) — 100%',
    meta: '',
  },
];

const STATS = [
  { label: 'CGPA', value: 8.63, decimals: 2, suffix: '' },
  { label: 'Internships', value: 2, decimals: 0, suffix: '' },
  { label: 'Certifications', value: 10, decimals: 0, suffix: '+' },
  { label: 'Published Paper', value: 1, decimals: 0, suffix: '' },
];

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
}

const CountUp = ({ value, decimals = 0, suffix = '' }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(eased * value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-24"
    >
      {/* Colorful gradient-sweep transition that wipes in as the section enters view */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            'linear-gradient(100deg, transparent 0%, #B600A8 35%, #7621B0 50%, #BE4C00 65%, transparent 100%)',
        }}
        initial={{ opacity: 1, x: '-120%' }}
        animate={sectionInView ? { x: '120%' } : { x: '-120%' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 backdrop-blur-2xl"
        initial={{ opacity: 1 }}
        animate={sectionInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: 'easeOut' }}
      />
      {/* Ambient 3D laptop illustration — background element for this section only */}
      <FadeIn
        delay={0.15}
        x={70}
        y={0}
        duration={1.1}
        className="pointer-events-none absolute -right-6 sm:right-[2%] md:right-[6%] top-[10%] w-[280px] sm:w-[380px] md:w-[460px] opacity-[0.55] sm:opacity-70"
        style={{ aspectRatio: '560 / 400' }}
      >
        <LaptopVisual />
      </FadeIn>

      {/* Center content — presented as a single full-width glassmorphism card */}
      <div className="relative z-10 mx-auto w-full max-w-6xl rounded-[36px] sm:rounded-[44px] border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.035] backdrop-blur-xl px-6 sm:px-10 md:px-16 py-14 sm:py-16 md:py-20 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center shadow-[0_0_60px_rgba(182,0,168,0.06)]">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 120px)' }}
          >
            About me
          </h2>
        </FadeIn>

          <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
                    <AnimatedText
                      text={ABOUT_TEXT}
                      className="font-medium leading-relaxed text-[#D7E2EA] max-w-[600px]"
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
                    />

                    {/* Stat counters */}
                    <FadeIn delay={0.05} className="w-full max-w-3xl">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {STATS.map((stat) => (
                          <div
                            key={stat.label}
                            className="group rounded-2xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.03] px-4 py-5 sm:py-6 transition-all duration-300 hover:border-[#D7E2EA]/30 hover:-translate-y-1"
                          >
                            <p
                              className="hero-heading font-black leading-none"
                              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                            >
                              <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                            </p>
                            <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-widest text-[#D7E2EA]/45">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </FadeIn>

                    {/* Education — highlighted */}
                    <FadeIn delay={0.1} className="w-full max-w-3xl">
                      <p className="mb-4 text-left text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-[#D7E2EA]/45">
                        Education
                      </p>
                      <div className="flex flex-col gap-4 sm:gap-5">
                        {EDUCATION.map((edu, i) => (
                          <div
                            key={edu.school}
                            className="group relative overflow-hidden rounded-2xl border border-[#B600A8]/25 bg-gradient-to-r from-[#B600A8]/10 via-[#141418] to-[#141418] px-5 sm:px-6 py-5 text-left transition-all duration-300 hover:border-[#B600A8]/50 hover:-translate-y-0.5"
                          >
                            <div
                              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                              style={{ background: i === 0 ? '#B600A8' : '#7621B0' }}
                            />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#B600A8]/40 bg-[#B600A8]/10">
                                  <GraduationCap size={17} className="text-[#e879c9]" strokeWidth={1.8} />
                                </span>
                                <div>
                                  <p className="text-sm sm:text-base font-semibold text-[#D7E2EA]">{edu.school}</p>
                                  <p className="text-xs sm:text-sm text-[#D7E2EA]/55 uppercase tracking-wide mt-1">{edu.detail}</p>
                                </div>
                              </div>
                              {edu.meta && (
                                <span className="shrink-0 self-start sm:self-center rounded-full border border-[#B600A8]/40 bg-[#B600A8]/15 px-3.5 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#f0a8e2]">
                                  {edu.meta}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.25}>
                      <ContactButton />
                    </FadeIn>
                  </div>      </div>
    </section>
  );
};

export default AboutSection;
