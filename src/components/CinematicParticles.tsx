import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  baseX: number;
  baseY: number;
  speed: number;
  phase: number;
  hue: 'orange' | 'blue' | 'white';
  drift: number;
}

// Lightweight canvas-based cinematic bokeh/particle layer.
// Warm orange + soft blue + white glowing particles, additive blending,
// slow sine-wave float, and a gentle mouse-parallax camera shift.
const CinematicParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const colors: Record<Particle['hue'], string> = {
      orange: '255, 158, 87',
      blue: '110, 168, 255',
      white: '255, 255, 255',
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 30 : width < 1024 ? 48 : 65;
      particles = Array.from({ length: count }, () => {
        const hueRoll = Math.random();
        const hue: Particle['hue'] = hueRoll < 0.55 ? 'orange' : hueRoll < 0.8 ? 'white' : 'blue';
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          r: Math.random() * 2.6 + 0.8,
          speed: Math.random() * 0.4 + 0.15,
          phase: Math.random() * Math.PI * 2,
          hue,
          drift: Math.random() * 30 + 10,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x: nx, y: ny };
    };

    let t = 0;
    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const parX = mouseRef.current.x * 14;
      const parY = mouseRef.current.y * 10;

      for (const p of particles) {
        const floatY = Math.sin(t * p.speed + p.phase) * p.drift;
        const floatX = Math.cos(t * p.speed * 0.7 + p.phase) * (p.drift * 0.5);
        const x = p.baseX + floatX + parX;
        const y = p.baseY + floatY + parY;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.r * 8);
        const rgb = colors[p.hue];
        glow.addColorStop(0, `rgba(${rgb}, 0.55)`);
        glow.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${rgb}, 0.85)`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default CinematicParticles;
