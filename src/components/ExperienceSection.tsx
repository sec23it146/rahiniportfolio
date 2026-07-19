import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface ExperienceItem {
  role: string;
  org: string;
  period: string;
  detail: string;
  stack: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Full Stack Web Development Intern',
    org: 'OneYes Infotech Solutions Pvt. Ltd.',
    period: '30 Days · Jul 2025',
    detail:
      'Developed a MERN-based Smart Home Automation Dashboard with secure authentication, role-based access control, device automation, real-time notifications, and responsive dashboards.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
  },
  {
    role: 'Machine Learning Intern',
    org: 'Cognifyz Technologies',
    period: '15 Days · Jul 2026',
    detail:
      'Built a Restaurant Rating Prediction model using regression techniques and developed a content-based Restaurant Recommendation System.',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Jupyter Notebook'],
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-transparent px-5 sm:px-8 md:px-10 pt-8 pb-16 sm:pb-20"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 120px)' }}
        >
          Experience
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-14 sm:mb-20 text-xs sm:text-sm">
          Internships
        </p>
      </FadeIn>

      <div className="relative mx-auto max-w-3xl">
        {/* Vertical growing line */}
        <div className="absolute left-[13px] sm:left-1/2 top-0 bottom-0 w-px bg-[#D7E2EA]/10 sm:-translate-x-1/2">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-px bg-gradient-to-b from-[#B600A8] via-[#7621B0] to-[#BE4C00]"
          />
        </div>

        <div className="flex flex-col gap-12 sm:gap-16">
          {EXPERIENCE.map((exp, i) => {
            const fromLeft = i % 2 === 0;
            return (
              <div key={exp.role} className="relative pl-10 sm:pl-0">
                {/* Node */}
                <FadeIn delay={0.1} className="absolute left-0 sm:left-1/2 top-1.5 sm:-translate-x-1/2 z-10">
                  <span
                    className="block h-3.5 w-3.5 rounded-full border-2 border-[#0C0C0C]"
                    style={{
                      background: 'linear-gradient(135deg, #B600A8, #BE4C00)',
                      boxShadow: '0 0 0 4px rgba(182,0,168,0.15), 0 0 16px rgba(182,0,168,0.5)',
                    }}
                  />
                </FadeIn>

                <FadeIn
                  x={fromLeft ? -40 : 40}
                  y={0}
                  className={`sm:w-[46%] ${fromLeft ? 'sm:mr-auto sm:pr-2' : 'sm:ml-auto sm:pl-2'}`}
                >
                  <div className="rounded-2xl border border-[#D7E2EA]/12 bg-[#D7E2EA]/[0.03] p-5 sm:p-6 transition-all duration-300 hover:border-[#D7E2EA]/30 hover:-translate-y-1">
                    <div className="flex flex-col gap-1 mb-3">
                      <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
                        {exp.period}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-[#D7E2EA]">{exp.role}</h3>
                      <span className="text-sm text-[#D7E2EA]/55">{exp.org}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#D7E2EA]/70 mb-4">{exp.detail}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-2.5 py-1 text-[11px] text-[#D7E2EA]/65"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
