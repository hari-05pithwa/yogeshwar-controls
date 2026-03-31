import React from 'react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  align = "center", 
  className = "" 
}) => {
  // Dynamic alignment classes
  const alignmentClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  const marginClass = align === "left" ? "mr-auto" : align === "right" ? "ml-auto" : "mx-auto";

  return (
    <div className={`${alignmentClass} mb-12 px-6 ${className}`}>
      <h2 className="text-slate-900 text-3xl md:text-5xl font-black tracking-tight">
        {title}
      </h2>
      
      {/* The Underline Decorator */}
      <div className={`w-16 h-1.5 bg-primary ${marginClass} mt-4 rounded-full opacity-60`} />
      
      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;