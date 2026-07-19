import { ArrowUpRight } from 'lucide-react';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

const LiveProjectButton = ({ href, label = 'View project', className = '' }: LiveProjectButtonProps) => {
  const content = (
    <>
      {label}
      <ArrowUpRight size={16} strokeWidth={2} />
    </>
  );

  const baseClass =
    'inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/[0.04] px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition-all duration-200 hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10';

  if (!href) {
    return (
      <span className={`${baseClass} opacity-60 ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${className}`}
    >
      {content}
    </a>
  );
};

export default LiveProjectButton;
