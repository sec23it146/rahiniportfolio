import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1900;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease-out curve so it feels like it's "loading" rather than linear.
      const t = Math.min(elapsed / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 250);
        setTimeout(() => onFinish(), 950);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-[#0C0C0C]"
        style={{ pointerEvents: exiting ? 'none' : 'auto' }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 45%, rgba(182,0,168,0.16) 0%, rgba(118,33,176,0.10) 35%, transparent 70%)',
          }}
        />

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 26 }).map((_, i) => {
            const left = (i * 37) % 100;
            const size = 1.5 + ((i * 13) % 4);
            const delay = (i % 10) * 0.25;
            const duration = 5 + (i % 5);
            return (
              <span
                key={i}
                className="absolute rounded-full bg-[#D7E2EA]/40"
                style={{
                  left: `${left}%`,
                  bottom: '-10px',
                  width: size,
                  height: size,
                  animation: `loaderFloat ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </div>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: 16, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 mb-6 sm:mb-8"
        >
          <span
            className="hero-heading font-black uppercase"
            style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)' }}
          >
            RS
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative z-10 mb-8 text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] text-[#D7E2EA]/50"
        >
          Rahini Selvaraj
        </motion.p>

        {/* Progress bar */}
        <div className="relative z-10 h-[3px] w-[180px] sm:w-[240px] overflow-hidden rounded-full bg-[#D7E2EA]/10">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background:
                'linear-gradient(90deg, #18011F 0%, #B600A8 40%, #7621B0 75%, #BE4C00 100%)',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 12px rgba(182,0,168,0.6)',
            }}
          />
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="relative z-10 mt-4 font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#D7E2EA]/40"
        >
          {String(progress).padStart(3, '0')}%
        </motion.span>

        <style>{`
          @keyframes loaderFloat {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
