import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
  pulse: number;
  pulseSpeed: number;
}

// Fixed, full-viewport canvas that floats behind every section of the site.
// Tiny glowing nodes drift slowly and draw faint connecting lines to nearby
// nodes — a subtle "AI network" texture that reads through the transparent
// sections as you scroll, without competing with the foreground content.
const AINetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let maxDist = 150;

    const HUES = ['110, 168, 255', '214, 158, 255', '255, 127, 198', '47, 227, 154'];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maxDist = width < 640 ? 110 : width < 1024 ? 135 : 160;
      const count = width < 640 ? 26 : width < 1024 ? 42 : 58;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.4 + 0.9,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.006,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // gentle parallax toward cursor
        const dx = (mouseRef.current.x - width / 2) * 0.008;
        const dy = (mouseRef.current.y - height / 2) * 0.008;

        const pulseR = n.r + Math.sin(n.pulse) * 0.6;
        const px = n.x + dx;
        const py = n.y + dy;

        const glow = ctx.createRadialGradient(px, py, 0, px, py, pulseR * 7);
        glow.addColorStop(0, `rgba(${n.hue}, 0.5)`);
        glow.addColorStop(1, `rgba(${n.hue}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, pulseR * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${n.hue}, 0.9)`;
        ctx.beginPath();
        ctx.arc(px, py, pulseR, 0, Math.PI * 2);
        ctx.fill();
      }

      // connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = `rgba(160, 190, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

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
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Large blurred gradient orbs — slow drift + breathing scale/opacity, for depth */}
      <div className="net-orb net-orb-1" />
      <div className="net-orb net-orb-2" />
      <div className="net-orb net-orb-3" />
      <div className="net-orb net-orb-4" />

      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      {/* soft vignette so the network fades near the very top/bottom of the viewport */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(12,12,12,0.55)_100%)]" />

      <style>{`
        .net-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform, opacity;
        }
        .net-orb-1 {
          top: -8%; left: -10%;
          width: 42vw; height: 42vw;
          background: radial-gradient(circle, rgba(94,184,255,0.32), transparent 70%);
          opacity: 0.55;
          animation: netOrbFloat1 24s ease-in-out infinite;
        }
        .net-orb-2 {
          top: 30%; right: -12%;
          width: 38vw; height: 38vw;
          background: radial-gradient(circle, rgba(147,92,246,0.3), transparent 70%);
          opacity: 0.4;
          animation: netOrbFloat2 28s ease-in-out infinite -6s;
        }
        .net-orb-3 {
          bottom: -10%; left: 15%;
          width: 34vw; height: 34vw;
          background: radial-gradient(circle, rgba(47,227,255,0.26), transparent 70%);
          opacity: 0.35;
          animation: netOrbFloat3 32s ease-in-out infinite -14s;
        }
        .net-orb-4 {
          bottom: 10%; right: 20%;
          width: 26vw; height: 26vw;
          background: radial-gradient(circle, rgba(118,33,176,0.3), transparent 70%);
          opacity: 0.45;
          animation: netOrbFloat1 20s ease-in-out infinite -9s;
        }
        @keyframes netOrbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate(4%, 5%) scale(1.15); opacity: 0.75; }
        }
        @keyframes netOrbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-5%, 4%) scale(1.2); opacity: 0.6; }
        }
        @keyframes netOrbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.35; }
          50% { transform: translate(3%, -6%) scale(1.12); opacity: 0.55; }
        }
      `}</style>
    </div>
  );
};

export default AINetworkBackground;
