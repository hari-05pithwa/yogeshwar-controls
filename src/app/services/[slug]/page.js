// src/app/services/[slug]/page.js

export default async function ServiceDetailPage({ params }) {
  // 1. You MUST await the params in the new version of Next.js
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <main className="py-32 px-6 md:px-16 lg:px-24 bg-[#080f20] min-h-screen">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Safety check: ensure slug exists before calling .replace() */}
        <h1 className="text-4xl md:text-6xl font-bold text-white capitalize leading-tight">
          {slug ? slug.replace(/-/g, ' ') : "Service Detail"}
        </h1>
        
        <div className="w-24 h-1.5 bg-[#FFD982] mt-6 rounded-full"></div>

        <p className="mt-12 text-lg text-slate-600 leading-relaxed">
          Detailed information about our <span className="font-bold text-[#c3d6ff]">{slug}</span> solutions for industrial environments will go here.
        </p>
      </div>
    </main>
  );
}