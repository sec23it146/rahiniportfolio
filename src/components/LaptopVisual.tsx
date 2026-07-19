// Decorative, stylized 3D-tilted laptop illustration used only as an ambient
// background element behind the About section's content card. Pure SVG/CSS,
// no external assets — floats gently and keeps a soft perspective tilt.
const LaptopVisual = () => {
  return (
    <div className="laptop-visual-wrap pointer-events-none select-none">
      <svg
        viewBox="0 0 560 400"
        className="h-full w-full"
        style={{ filter: 'drop-shadow(0 30px 60px rgba(118, 33, 176, 0.35))' }}
      >
        <defs>
          <linearGradient id="lidGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#26262e" />
            <stop offset="100%" stopColor="#131318" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a0a2e" />
            <stop offset="55%" stopColor="#0d1b3a" />
            <stop offset="100%" stopColor="#0a0a12" />
          </linearGradient>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c2c34" />
            <stop offset="100%" stopColor="#0f0f13" />
          </linearGradient>
          <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D69EFF" />
            <stop offset="50%" stopColor="#7FD8FF" />
            <stop offset="100%" stopColor="#FF7FC6" />
          </linearGradient>
        </defs>

        {/* base / keyboard deck (isometric) */}
        <g>
          <path d="M40 330 L520 330 L470 372 L90 372 Z" fill="url(#baseGrad)" />
          <path d="M40 330 L520 330 L520 338 L40 338 Z" fill="#3a3a44" opacity="0.5" />
          {/* trackpad hint */}
          <rect x="250" y="345" width="60" height="16" rx="4" fill="#050506" opacity="0.5" />
        </g>

        {/* screen / lid, slightly tilted back */}
        <g transform="skewX(-3)">
          <rect x="70" y="40" width="420" height="292" rx="14" fill="url(#lidGrad)" />
          <rect x="86" y="56" width="388" height="260" rx="8" fill="url(#screenGrad)" />

          {/* glow */}
          <ellipse cx="280" cy="150" rx="180" ry="120" fill="#7621B0" opacity="0.18" />

          {/* stylised dashboard content on screen */}
          <rect x="106" y="80" width="130" height="10" rx="5" fill="#D69EFF" opacity="0.85">
            <animate attributeName="width" values="60;130;60" dur="6s" repeatCount="indefinite" />
          </rect>
          <rect x="106" y="102" width="90" height="8" rx="4" fill="#7FD8FF" opacity="0.6" />

          {/* bar chart */}
          <g>
            <rect x="106" y="230" width="18" height="50" rx="3" fill="url(#barGrad)">
              <animate attributeName="height" values="30;58;30" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="y" values="250;222;250" dur="4.5s" repeatCount="indefinite" />
            </rect>
            <rect x="134" y="210" width="18" height="70" rx="3" fill="url(#barGrad)" opacity="0.9">
              <animate attributeName="height" values="70;40;70" dur="5.2s" repeatCount="indefinite" />
              <animate attributeName="y" values="210;240;210" dur="5.2s" repeatCount="indefinite" />
            </rect>
            <rect x="162" y="245" width="18" height="35" rx="3" fill="url(#barGrad)" opacity="0.75">
              <animate attributeName="height" values="35;60;35" dur="3.8s" repeatCount="indefinite" />
              <animate attributeName="y" values="245;220;245" dur="3.8s" repeatCount="indefinite" />
            </rect>
            <rect x="190" y="225" width="18" height="55" rx="3" fill="url(#barGrad)" opacity="0.85">
              <animate attributeName="height" values="55;30;55" dur="4.8s" repeatCount="indefinite" />
              <animate attributeName="y" values="225;250;225" dur="4.8s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* line chart */}
          <polyline
            points="250,260 280,225 310,245 340,190 370,215 400,170 430,200"
            fill="none"
            stroke="#5EB8FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <circle cx="430" cy="200" r="4" fill="#5EB8FF">
            <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* code-ish lines */}
          <rect x="250" y="90" width="70" height="6" rx="3" fill="#2FE39A" opacity="0.55" />
          <rect x="250" y="104" width="110" height="6" rx="3" fill="#FFB25E" opacity="0.5" />
          <rect x="250" y="118" width="50" height="6" rx="3" fill="#D69EFF" opacity="0.5" />

          {/* faint grid */}
          <g opacity="0.08" stroke="#ffffff">
            <line x1="86" y1="150" x2="474" y2="150" strokeWidth="1" />
            <line x1="86" y1="200" x2="474" y2="200" strokeWidth="1" />
          </g>
        </g>

        {/* webcam dot */}
        <circle cx="280" cy="48" r="2.5" fill="#3a3a44" />
      </svg>

      <style>{`
        .laptop-visual-wrap {
          width: 100%;
          height: 100%;
          animation: laptopFloat 7s ease-in-out infinite;
        }
        @keyframes laptopFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(0.6deg); }
        }
      `}</style>
    </div>
  );
};

export default LaptopVisual;
