export default function Button({ children, className = "" }) {
  return (
    <button className={`group flex items-center gap-1 transition-transform active:scale-95 ${className}`}>
      {/* 1. Main Text Pill */}
      <div className="bg-primary text-navy px-10 py-4 rounded-full font-bold text-sm md:text-base shadow-sm group-hover:bg-primary-hover transition-colors">
        {children}
      </div>

      {/* 2. Separate Arrow Circle */}
      <div className="bg-primary text-navy h-[52px] w-[52px] md:h-[58px] md:w-[58px] rounded-full flex items-center justify-center shadow-sm transition-colors group-hover:bg-primary-hover">
        <svg 
          width="22" 
          height="22" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          /* Default: Rotate 45deg to point purely RIGHT 
             Hover: Rotate 0deg (native SVG orientation) to point TOP-RIGHT
          */
          className="transition-transform duration-300 ease-out rotate-45 group-hover:rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>
    </button>
  );
}