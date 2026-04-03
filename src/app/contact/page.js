"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/sections/ContactForm";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef(null);

  // 1. Updated Map Source URLs with your provided embed links
  const mapLocations = {
    registered: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.62890467009!2d72.5770730747707!3d23.03739391577597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e854e720eaccf%3A0xa759b6cb0da46efe!2sMahavir%20flat!5e0!3m2!1sen!2sin!4v1775194376543!5m2!1sen!2sin",
    postal: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.6301793983725!2d72.54706177451399!3d23.0740160932229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8300151a17b3%3A0x60720b9512ee38ff!2sPATIDAR%20CHOWK%2C%20K.%20K.%20Nagar%20Road!5e0!3m2!1sen!2sin!4v1775194549279!5m2!1sen!2sin"
  };

  const [activeKey, setActiveKey] = useState("registered");
  const [activeLabel, setActiveLabel] = useState("Registered Office (Shahpur)");

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }).from(
        ".reveal-item",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  const handleMapSwitch = (key, label) => {
    setActiveKey(key);
    setActiveLabel(label);
  };

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-[#0B1221] text-white pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/80 via-transparent to-[#0B1221]/60"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl reveal-text">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#FFD982]"></div>
              <span className="text-[#FFD982] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
              Let's Connect <br /> <span className="text-[#FFD982]">With Us.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Have a technical inquiry or need an expert evaluation of your distribution system? Our team is ready to deliver precise electrical solutions tailored to your operational needs.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONNECT SECTION --- */}
      <section className="py-16 md:py-32 bg-[#F8F9FA] relative z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
            <div className="space-y-10 reveal-item">
              <div className="space-y-4">
                <h2 className="text-[#0B1221] text-3xl md:text-5xl font-black uppercase tracking-tight">Connect With <br /> Yogeshwar Controls</h2>
                <div className="h-1.5 w-20 bg-[#FFD982]"></div>
              </div>
              <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                <p>Have questions? Select an office address below to view the precise location and marker on the map.</p>
              </div>
              <div className="space-y-6 pt-4 border-l-4 border-gray-200 pl-6 md:pl-8">
                <a href="tel:+919924129959" className="flex items-center gap-5 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                    <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl md:text-2xl font-bold">call</span>
                  </div>
                  <span className="text-[#0B1221] font-black text-xl md:text-2xl tracking-tighter">+91 99241 29959</span>
                </a>
                <a href="mailto:yogeshwar.controls@yahoo.com" className="flex items-center gap-5 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                    <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl md:text-2xl font-bold">mail</span>
                  </div>
                  <span className="text-[#0B1221] font-black text-[16px] md:text-2xl tracking-tighter break-all">yogeshwar.controls@yahoo.com</span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Address Blocks */}
            <div className="reveal-item space-y-12">
              <div className="grid grid-cols-1 mt-8 md:mt-0 md:grid-cols-2 lg:grid-cols-1 gap-10 md:gap-12">
                
                {/* REGISTERED OFFICE */}
                <div className="group">
                  <p className="text-[#0B1221] font-black uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 ${activeKey === 'registered' ? 'bg-[#FFD982]' : 'bg-gray-300'}`}></span> Registered Office
                  </p>
                  <address className="not-italic text-gray-500 font-bold text-base md:text-lg leading-relaxed border-l-2 border-gray-100 pl-4 mb-6">
                    7, Mahavir Flats, Shahpur Chakla, <br /> Ahmedabad – 380001
                  </address>
                  <button 
                    onClick={() => handleMapSwitch("registered", "Registered Office (Shahpur)")}
                    className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeKey === 'registered' ? 'bg-[#FFD982] text-[#0B1221] shadow-md' : 'bg-[#0B1221] text-white hover:bg-[#FFD982] hover:text-[#0B1221]'}`}
                  >
                    {activeKey === 'registered' ? 'Location Active' : 'View on Map'}
                  </button>
                </div>

                {/* POSTAL CORRESPONDENCE */}
                <div className="group">
                  <p className="text-[#0B1221] font-black uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 ${activeKey === 'postal' ? 'bg-[#FFD982]' : 'bg-gray-300'}`}></span> Postal Correspondence
                  </p>
                  <address className="not-italic text-gray-500 font-bold text-base md:text-lg leading-relaxed border-l-2 border-gray-100 pl-4 mb-6">
                    30, Sarvoday Nagar-3, Patidar Chowk, <br /> Ghatlodiya, Ahmedabad-380061
                  </address>
                  <button 
                    onClick={() => handleMapSwitch("postal", "Postal Correspondence (Ghatlodiya)")}
                    className={`px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeKey === 'postal' ? 'bg-[#FFD982] text-[#0B1221] shadow-md' : 'bg-[#0B1221] text-white hover:bg-[#FFD982] hover:text-[#0B1221]'}`}
                  >
                    {activeKey === 'postal' ? 'Location Active' : 'View on Map'}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="w-full h-px bg-gray-100"></div>
            <div className="flex items-center justify-center gap-4 py-8">
               <div className="h-[1px] w-8 bg-gray-200"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#0B1221]">
                 <span className="text-[12px] md:text-xl">{activeLabel}</span>
               </p>
               <div className="h-[1px] w-8 bg-gray-200"></div>
            </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[350px] md:h-[500px] border border-gray-100 shadow-sm transition-all duration-700">
            <iframe
              src={mapLocations[activeKey]}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-12">
            <div className="w-full h-px bg-gray-200"></div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-start-2 lg:col-span-10 reveal-item mx-auto w-full max-w-4xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}