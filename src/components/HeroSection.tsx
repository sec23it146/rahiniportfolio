import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import FadeIn from './FadeIn';
import CinematicParticles from './CinematicParticles';
import Magnet from './Magnet';

const TYPED_LINE = 'Python Developer · Machine Learning · Full-Stack Engineering';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [typed, setTyped] = useState('');
  const [buttonsReady, setButtonsReady] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  // Cursor-follow glow across the whole hero, plus a localized 3D tilt
  // on the photo card when the cursor is over it.
  useEffect(() => {
    const wrap = imgWrapRef.current;
    const glow = glowRef.current;

    const onMove = (e: MouseEvent) => {
      if (glow) {
        glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(214,158,255,0.14), transparent 65%)`;
      }
      if (wrap) {
        const rect = wrap.getBoundingClientRect();
        const isOver =
          e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (isOver) {
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          wrap.style.transform = `perspective(900px) rotateX(${py * -10}deg) rotateY(${px * 14}deg) scale(1.02)`;
        } else {
          wrap.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        }
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Typewriter effect for the subtitle line — starts once the name has
  // finished revealing, then the CTA buttons fade in once typing ends.
  useEffect(() => {
    const startDelay = 1350; // matches name FadeIn delay + duration below
    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setTyped(TYPED_LINE.slice(0, i));
        if (i >= TYPED_LINE.length) {
          clearInterval(interval);
          setTimeout(() => setButtonsReady(true), 250);
        }
      }, 28);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, []);

  // Snap-scroll: one wheel tick / keypress while at top → jump to About
  useEffect(() => {
    let fired = false;

    const goToAbout = () => {
      if (fired) return;
      fired = true;
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
    };

    const onWheel = (e: WheelEvent) => {
      if (fired) return;
      if (e.deltaY <= 0) return;
      if (window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };

    const onKey = (e: KeyboardEvent) => {
      if (fired) return;
      if (window.scrollY > 50) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToAbout();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0d]">
      {/* Abstract animated gradient background */}
      <div className="absolute inset-0">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      {/* Cinematic particle / bokeh layer */}
      <CinematicParticles />

      {/* Ambient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10" />

      {/* Glow that follows the cursor */}
      <div ref={glowRef} className="pointer-events-none absolute inset-0 z-[5] hidden md:block" />

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Floating status badge (space reserved below fixed navbar) */}
        <FadeIn delay={0.6} y={-16} className="relative">
          <div className="flex justify-center px-6 pt-24 md:pt-28">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-white/85">
                Open to opportunities
              </span>
            </motion.div>
          </div>
        </FadeIn>

        {/* Middle row: left = name/text, right = glass photo card */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 px-6 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10">
            {/* Left: PORTFOLIO + Name + Subtitle + Buttons */}
            <div className="w-full md:max-w-[54%]">
              <FadeIn delay={0.3} y={20}>
                <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                  Portfolio · 2026
                </p>
              </FadeIn>

              <FadeIn delay={0.5} y={40}>
                <h1
                  onTouchStart={() => {
                    setNameTouched(true);
                    window.setTimeout(() => setNameTouched(false), 1400);
                  }}
                  className={`hero-name font-black uppercase leading-[0.88] tracking-tight ${nameTouched ? 'hero-name-active' : ''}`}
                  style={{ fontSize: 'clamp(2.6rem, 9vw, 8rem)' }}
                >
                  Rahini<br />Selvaraj
                </h1>
              </FadeIn>

              <p className="mt-5 md:mt-7 min-h-[1.4em] text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75">
                {typed}
                <span className="hero-cursor" />
              </p>

              <div
                className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 transition-all duration-700"
                style={{
                  opacity: buttonsReady ? 1 : 0,
                  transform: buttonsReady ? 'translateY(0)' : 'translateY(14px)',
                  pointerEvents: buttonsReady ? 'auto' : 'none',
                }}
              >
                <Magnet padding={60} strength={4}>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-black transition-all duration-200 hover:bg-white/90"
                  >
                    View Work
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </a>
                </Magnet>
                <Magnet padding={60} strength={4}>
                  <a
                    href="/Rahini_Selvaraj_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white backdrop-blur-md transition-all duration-200 hover:border-white/60 hover:bg-white/10"
                  >
                    Resume
                    <Download size={15} strokeWidth={2} />
                  </a>
                </Magnet>
              </div>
            </div>

            {/* Right: glassmorphism portrait card */}
            <FadeIn delay={0.75} x={60} y={0} duration={1}>
              <div
                className="hero-photo-card group relative w-[260px] sm:w-[340px] md:w-[400px] lg:w-[440px] aspect-[4/5] rounded-[28px] sm:rounded-[32px] border border-white/15 bg-white/[0.04] p-2.5 sm:p-3 backdrop-blur-xl"
                style={{ animation: 'heroCardFloat 6s ease-in-out infinite' }}
              >
                <div
                  ref={imgWrapRef}
                  className="relative h-full w-full overflow-hidden rounded-[20px] sm:rounded-[24px] will-change-transform"
                  style={{ transition: 'transform 0.35s ease-out' }}
                >
                  <img
                    src="/rahini.jpg"
                    alt="Rahini Selvaraj"
                    onLoad={() => setLoaded(true)}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: 'center 20%',
                      opacity: loaded ? 1 : 0,
                      transition: 'opacity 1s ease',
                      filter: 'saturate(1.05) contrast(1.05)',
                    }}
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                {/* glowing border sweep */}
                <span className="pointer-events-none absolute inset-0 rounded-[28px] sm:rounded-[32px] hero-photo-glow" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-end justify-end px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll indicator */}
          <FadeIn delay={1.1} y={20}>
            <a href="#about" aria-label="Scroll to next section" className="group flex flex-col items-center gap-3">
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition group-hover:text-white">
                Scroll
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span
                  className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
                  style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
                />
              </div>
            </a>
          </FadeIn>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.12); }
        }
        .hero-name {
          background: linear-gradient(90deg, #ffffff, #ffffff 45%, #D69EFF 50%, #7FD8FF 55%, #ffffff 60%, #ffffff);
          background-size: 300% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transition: background-position 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-name:hover,
        .hero-name:active,
        .hero-name-active {
          background-position: 0% 0;
        }
        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 0.9em;
          margin-left: 3px;
          vertical-align: -0.15em;
          background: currentColor;
          animation: heroCursorBlink 0.9s step-end infinite;
        }
        @keyframes heroCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.55;
        }
        .hero-blob-1 {
          top: -10%; left: -8%; width: 55vw; height: 55vw;
          background: radial-gradient(circle, #7621B0, transparent 65%);
          animation: heroBlobMove 20s ease-in-out infinite;
        }
        .hero-blob-2 {
          bottom: -15%; right: -10%; width: 50vw; height: 50vw;
          background: radial-gradient(circle, #0A3D6E, transparent 65%);
          animation: heroBlobMove 24s ease-in-out infinite -8s;
        }
        .hero-blob-3 {
          top: 30%; right: 15%; width: 32vw; height: 32vw;
          background: radial-gradient(circle, #B600A8, transparent 65%);
          animation: heroBlobMove 18s ease-in-out infinite -4s;
        }
        @keyframes heroBlobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, -6%) scale(1.12); }
        }
        @keyframes heroCardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .hero-photo-glow {
          border: 1px solid transparent;
          transition: all 0.4s ease;
        }
        .hero-photo-card:hover .hero-photo-glow {
          border-color: rgba(214,158,255,0.6);
          box-shadow: 0 0 40px rgba(214,158,255,0.35), 0 0 0 1px rgba(214,158,255,0.4) inset;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
