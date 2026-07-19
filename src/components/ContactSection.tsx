import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight, Download } from 'lucide-react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: '2803rahins@gmail.com',
    href: 'mailto:2803rahins@gmail.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 63815 97815',
    href: 'https://wa.me/916381597815',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/rahini-s-a026a0294',
    href: 'https://www.linkedin.com/in/rahini-s-a026a0294',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@sec23it146',
    href: 'https://github.com/sec23it146',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Distinct entrance transition: radial wipe reveal */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 bg-[#0C0C0C]"
        initial={{ clipPath: 'circle(150% at 50% 0%)' }}
        animate={sectionInView ? { clipPath: 'circle(0% at 50% 0%)' } : { clipPath: 'circle(150% at 50% 0%)' }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Heading */}
      <FadeIn delay={0.05} y={16}>
        <p className="text-center text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-[#D7E2EA]/45 mb-4">
          Get in touch
        </p>
      </FadeIn>
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.4rem, 9vw, 130px)' }}
        >
          🚀 Let's Build Something Amazing Together
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="mx-auto max-w-2xl text-center font-light normal-case tracking-wide text-[#D7E2EA]/70 mb-3"
          style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
        >
          I'm currently looking for new opportunities. Whether you have a question or just
          want to say hi, I'll try my best to get back to you!
        </p>
      </FadeIn>
      <FadeIn delay={0.2} y={20}>
        <p
          className="text-center font-light italic uppercase tracking-widest text-[#D7E2EA]/50 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)' }}
        >
          "Turning ideas into intelligent digital solutions."
        </p>
      </FadeIn>

      {/* Resume download */}
      <FadeIn delay={0.1} y={20}>
        <div className="mx-auto mb-12 sm:mb-16 flex max-w-5xl justify-center">
          <Magnet padding={70} strength={4}>
            <a
              href="/Rahini_Selvaraj_Resume.pdf"
              download
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#D7E2EA]/25 bg-[#D7E2EA]/[0.04] px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10"
            >
              <Download size={16} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
          </Magnet>
        </div>
      </FadeIn>

      {/* Contact cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <Magnet padding={40} strength={6}>
                <a
                  href={method.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1"
                >
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50">
                    <Icon
                      className="text-[#D7E2EA]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA] break-all"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
                  >
                    {method.value}
                  </span>
                </div>
                </a>
              </Magnet>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Rahini Selvaraj
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Designed & built in Chennai
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
