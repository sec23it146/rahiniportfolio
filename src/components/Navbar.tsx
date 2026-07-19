import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      Boolean,
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 z-[90] w-full"
      >
        <div
          className="mx-auto flex items-center justify-between transition-all duration-500"
          style={{
            maxWidth: scrolled ? '1000px' : '1240px',
            margin: scrolled ? '14px auto 0' : '20px auto 0',
            padding: scrolled ? '10px 20px' : '14px 26px',
            borderRadius: '999px',
            background: scrolled ? 'rgba(18,18,20,0.55)' : 'rgba(18,18,20,0.18)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(215,226,234,0.12)',
            boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          <a
            href="#hero"
            className="shrink-0 font-black uppercase tracking-widest text-[#D7E2EA] transition-transform hover:scale-105"
            style={{ fontSize: '0.95rem' }}
          >
            RS<span className="text-[#B600A8]">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="relative">
                <a
                  href={link.href}
                  className="relative inline-block px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[#D7E2EA]/70 transition-colors hover:text-[#D7E2EA]"
                >
                  {link.label}
                  <span
                    className="absolute left-3.5 right-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#B600A8] to-[#BE4C00] transition-transform duration-300"
                    style={{ transform: active === link.href ? 'scaleX(1)' : undefined }}
                  />
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B600A8]"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/Rahini_Selvaraj_Resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/25 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA] transition-all hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10"
            >
              <Download size={13} strokeWidth={2} />
              Resume
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/20 p-2.5 text-[#D7E2EA] transition hover:border-[#D7E2EA]/50"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#0C0C0C]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex justify-end px-6 pt-6">
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#D7E2EA]/20 p-2.5 text-[#D7E2EA]"
              >
                <X size={18} />
              </button>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="flex flex-col items-center gap-2 px-8 pt-8"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-full text-center"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 text-2xl font-medium uppercase tracking-widest text-[#D7E2EA]/80 transition hover:text-[#D7E2EA]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-4"
              >
                <a
                  href="/Rahini_Selvaraj_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[#D7E2EA]"
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
