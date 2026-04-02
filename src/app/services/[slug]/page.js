"use client";
import { useRef, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceDetails = {
  "electrical-installation": {
    title: "Electrical Installation",
    description: "Complete turnkey electrical installation for industrial plants. We manage everything from internal wiring to panel mounting and full system integration, ensuring compliance with all safety regulations.",
    features: ["Heavy-duty industrial wiring", "Main control panel installation", "Cable tray & raceways", "Emergency lighting systems"],
    image: "/services/service1.jpeg"
  },
  "maintenance-amc": {
    title: "Maintenance & AMC",
    description: "Our Annual Maintenance Contracts (AMC) are designed to provide peace of mind. We conduct periodic preventive checks to identify potential risks before they cause expensive downtime.",
    features: ["Routine health checks", "Cleaning & terminal tightening", "Infrared thermography", "Detailed performance reports"],
    image: "/services/service2.jpeg"
  },
  "switchgear-services": {
    title: "Switchgear Services",
    description: "Specialized overhauling and maintenance of LV/HV Switchgears. We handle ACB (Air Circuit Breakers), VCB (Vacuum Circuit Breakers), and OCB units with technical precision.",
    features: ["Breaker contact testing", "Secondary injection testing", "Mechanism lubrication", "Retrofitting old panels"],
    image: "/services/service3.jpeg"
  },
  "transformer-services": {
    title: "Transformer Services",
    description: "Transformers are the heart of your grid. We provide end-to-end services including oil filtration and breakdown repairs to extend the life of your distribution assets.",
    features: ["On-site oil filtration", "BDV & PPM testing", "Gasket replacement", "Bushing maintenance"],
    image: "/services/service4.jpeg"
  },
  "energy-audit": {
    title: "Energy Audit",
    description: "Identify wastage and reduce operational costs. Our certified auditors analyze your power quality, harmonics, and load distribution to recommend actionable saving measures.",
    features: ["Harmonic analysis", "Power factor optimization", "Load balancing", "Cost-benefit reports"],
    image: "/services/service5.jpeg"
  },
  "automation-repair": {
    title: "Automation & Repair",
    description: "Fast troubleshooting and repair for industrial automation systems. From PLC logic errors to VFD parameterization, we get your production back on track.",
    features: ["PLC troubleshooting", "VFD & drive repairs", "Sensor calibration", "Control circuit design"],
    image: "/services/service6.jpeg"
  },
  "testing-calibration": {
    title: "Electrical Testing & Calibration",
    description: "Ensure your protective relays and measurement tools are accurate. We provide certified testing services required for industrial safety compliance and audits.",
    features: ["Protection relay testing", "Insulation resistance (Megger)", "Primary injection testing", "Earthing pit testing"],
    image: "/services/service7.jpeg"
  },
  "earthing-safety": {
    title: "Earthing & Safety Solutions",
    description: "Protection for personnel and equipment. We design and install high-conductivity chemical and conventional earthing systems tailored to soil resistivity.",
    features: ["Chemical maintenance earthing", "Lightning protection systems", "Soil resistivity testing", "Safety compliance audits"],
    image: "/services/service8.jpeg"
  },
  "ht-lt-services": {
    title: "HT & LT Services",
    description: "Comprehensive engineering for High Tension (HT) and Low Tension (LT) networks. We handle everything from substation setups to feeder pillar distribution.",
    features: ["HT cable jointing", "Transformer installation", "Busbar trunking systems", "Substation maintenance"],
    image: "/services/service9.jpg"
  },
  "breakdown-support": {
    title: "24/7 Breakdown Support",
    description: "Emergency electrical response for critical failures. Our team is available round-the-clock to diagnose and repair faults that threaten your production schedule.",
    features: ["1-hour rapid response", "Expert fault diagnosis", "Emergency component sourcing", "On-site repairs"],
    image: "/services/service10.jpg"
  }
};

export default function ServiceDetailPage({ params }) {
  const containerRef = useRef(null);
  
  // Use React.use() to unwrap params Promise for Next.js 15
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const service = serviceDetails[slug];

  useGSAP(() => {
    if (!service) return;

    // Standard Page Entry Reveal
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".reveal-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })
    .from(".reveal-sub", {
      x: -20,
      opacity: 0,
      duration: 0.8
    }, "-=0.6");

    // Section Content Reveal (Basic scroll triggers for entire blocks)
    gsap.from(".reveal-content-block", {
      scrollTrigger: {
        trigger: ".reveal-content-block",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
    });

  }, { scope: containerRef, dependencies: [slug] });

  if (!service) notFound();

  return (
    <main ref={containerRef} className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* --- HERO HEADER --- */}
      <section className="bg-[#0B1221] pt-32 pb-16 md:pt-48 md:pb-32 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FFD982]/5 skew-x-12 translate-x-20 hidden md:block"></div>
        
        <div className="container mx-auto relative z-10 text-left">
          <Link href="/services" className="text-[#FFD982] flex items-center gap-2 mb-8 group w-fit reveal-sub">
             <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 text-sm md:text-base">arrow_back</span>
             <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Services</span>
          </Link>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] max-w-4xl capitalize reveal-header">
            {service.title}<span className="text-[#FFD982]">.</span>
          </h1>
          <div className="h-1.5 w-16 md:w-24 bg-[#FFD982] mt-6 reveal-header"></div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-12 md:py-32 px-6 md:px-16 lg:px-24 bg-white reveal-content-block">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* Image Section */}
            <div className="w-full lg:w-5/12">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <h2 className="text-[#0B1221] text-2xl md:text-4xl font-bold tracking-tight mb-6">
                Service overview
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-medium">
                {service.description}
              </p>

              {/* What's Included Block */}
              <div className="space-y-8">
                <h3 className="text-[#0B1221] text-lg md:text-xl font-bold flex items-center gap-4">
                  <span className="w-10 h-px bg-[#FFD982]"></span> What's included
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-[#F8F9FA] rounded-[1.5rem] border border-gray-50 transition-all hover:border-[#FFD982]/50 hover:bg-white hover:shadow-md group">
                      <span className="material-symbols-outlined text-[#FFD982] group-hover:scale-110 transition-transform font-bold text-xl">bolt</span>
                      <span className="text-[#0B1221] font-semibold tracking-tight text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECHNICAL STANDARDS BLOCK */}
             {/* --- TECHNICAL STANDARDS BLOCK --- */}
<div className="mt-12 md:mt-16 bg-[#F8F9FA] p-8 md:p-10 rounded-[2rem] flex flex-col md:flex-row gap-6 md:gap-10 items-center lg:items-start max-w-3xl md:max-w-5xl lg:max-w-3xl border border-gray-100">
  <div className="w-16 h-16 bg-[#0B1221] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
    <span className="material-symbols-outlined text-[#FFD982] text-3xl">verified_user</span>
  </div>
  <div className="text-center md:text-left">
    <h4 className="text-xl md:text-2xl font-black text-[#0B1221] tracking-tight mb-3">
      Technical standards
    </h4>
    <div className="h-1 w-12 bg-[#FFD982] mb-4 mx-auto md:mx-0"></div>
    <p className="text-gray-600 text-base leading-relaxed font-medium">
      Our operations are strictly aligned with <span className="text-[#0B1221] font-bold">IS/IEC industrial standards</span>, utilizing professional-grade calibrated instruments to guarantee safety and asset longevity.
    </p>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GET QUOTE SECTION --- */}
    <section className="bg-[#F8F9FA] pb-16 md:pb-32 px-6 md:px-16 lg:px-24">
  <div className="container mx-auto">
    {/* Changed md:flex-row to lg:flex-row. 
        Now:
        - Mobile & iPad (md): Vertical stack (flex-col)
        - Desktop (lg): Side-by-side (flex-row)
    */}
    <div className="bg-[#0B1221] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group border border-white/5">
      
      <div className="relative z-10 max-w-2xl">
        <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
          Ready to power your project?
        </h3>
        <p className="text-white/60 text-base md:text-lg font-medium">
          Contact our engineering team today for a technical evaluation and a comprehensive quote tailored to your facility.
        </p>
      </div>
      
      <div className="relative z-10 shrink-0">
        <Link href="/contact" className="inline-block bg-[#FFD982] text-[#0B1221] font-bold uppercase tracking-[0.2em] px-12 py-6 rounded-full hover:bg-white transition-all duration-500 shadow-2xl active:scale-95 text-sm md:text-base">
          Get a quote
        </Link>
      </div>

    </div>
  </div>
</section>
    </main>
  );
}