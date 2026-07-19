import { useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import FadeIn from './FadeIn';

interface Cert {
  issuer: string;
  title: string;
  focus: string;
}

const CERTS: Cert[] = [
  { issuer: 'NPTEL', title: 'Introduction to Database Systems', focus: 'Relational databases, SQL, transactions' },
  { issuer: 'NPTEL', title: 'Cloud Computing', focus: 'Cloud service models, virtualization' },
  { issuer: 'NPTEL', title: 'Programming in Java', focus: 'Core Java, OOP fundamentals' },
  { issuer: 'Cisco', title: 'CCNA: Introduction to Networks', focus: 'Networking fundamentals, protocols' },
  { issuer: 'Cisco', title: 'Introduction to Modern AI', focus: 'AI concepts and real-world applications' },
  { issuer: 'Cisco', title: 'Introduction to Data Science', focus: 'Data analysis foundations' },
  { issuer: 'Cisco', title: 'Python Essentials', focus: 'Python programming fundamentals' },
  { issuer: 'IBM SkillsBuild', title: 'Build Your First Chatbot', focus: 'Conversational AI basics' },
  { issuer: 'IBM SkillsBuild', title: 'Generative AI for Software Development', focus: 'GenAI-assisted development workflows' },
  { issuer: 'Oracle Academy', title: 'AI with Machine Learning in Java', focus: 'ML concepts implemented in Java' },
];

const LOOP = [...CERTS, ...CERTS];

const FlipCard = ({ cert }: { cert: Cert }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cert-flip-outer shrink-0 w-[230px] sm:w-[260px] h-[170px] cursor-pointer select-none transition-all duration-300"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Front */}
        <div
          className="cert-face absolute inset-0 flex flex-col justify-between rounded-2xl border border-[#D7E2EA]/15 bg-[#141418] p-5 transition-all duration-300"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/45">
              {cert.issuer}
            </span>
            <BadgeCheck size={16} className="text-[#B600A8]" strokeWidth={1.75} />
          </div>
          <h4 className="text-sm sm:text-base font-medium leading-snug text-[#D7E2EA]">
            {cert.title}
          </h4>
          <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/35">Tap to flip</span>
        </div>

        {/* Back */}
        <div
          className="cert-face absolute inset-0 flex flex-col justify-center gap-3 rounded-2xl border border-[#D7E2EA]/25 p-5 transition-all duration-300"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(150deg, #1b0620 0%, #141418 55%, #201007 100%)',
          }}
        >
          <BadgeCheck size={22} className="text-[#B600A8]" strokeWidth={1.5} />
          <p className="text-xs sm:text-sm leading-relaxed text-[#D7E2EA]/80">{cert.focus}</p>
          <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
            Issued by {cert.issuer}
          </span>
        </div>
      </div>
    </div>
  );
};

const CertificationsSection = () => {
  return (
    <section
      id="certifications"
      className="relative w-full bg-transparent px-0 pt-8 pb-20 sm:pb-24 overflow-hidden"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4 px-5"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 120px)' }}
        >
          Certifications
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-10 sm:mb-14 text-xs sm:text-sm px-5">
          10 certifications · tap any card to flip
        </p>
      </FadeIn>

      <div className="relative w-full">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#0C0C0C] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#0C0C0C] to-transparent" />

        <div className="cert-track flex w-max gap-5 py-2">
          {LOOP.map((cert, i) => (
            <FlipCard key={`${cert.title}-${i}`} cert={cert} />
          ))}
        </div>
      </div>

      <style>{`
        .cert-track {
          animation: certScroll 38s linear infinite;
        }
        .cert-track:hover {
          animation-play-state: paused;
        }
        .cert-flip-outer:hover .cert-face {
          filter: brightness(1.35);
          border-color: rgba(215, 226, 234, 0.55);
          box-shadow: 0 0 28px rgba(182, 0, 168, 0.3), 0 8px 24px rgba(0,0,0,0.4);
        }
        @keyframes certScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default CertificationsSection;
