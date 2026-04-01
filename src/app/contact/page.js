"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ContactForm from "@/components/sections/ContactForm";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const containerRef = useRef(null);

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

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      {/* --- HERO SECTION: FULL SCREEN WITH VIDEO BACKGROUND --- */}
      <section className="relative min-h-screen flex items-center bg-[#0B1221] text-white pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/80 via-transparent to-[#0B1221]/60"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl reveal-text">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#FFD982]"></div>
              <span className="text-[#FFD982] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
                Get In Touch
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
              Let's Connect <br />
              <span className="text-[#FFD982]">With Us.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Have a technical inquiry or need an expert evaluation of your
              distribution system? Our team is ready to deliver precise
              electrical solutions tailored to your operational needs.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONNECT SECTION: #F8F9FA BACKGROUND --- */}
      <section className="py-16 md:py-32 bg-[#F8F9FA] relative z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
            {/* LEFT SIDE */}
            <div className="space-y-10 reveal-item">
              <div className="space-y-4">
                <h2 className="text-[#0B1221] text-3xl md:text-5xl font-black uppercase tracking-tight">
                  Connect With <br /> Yogeshwar Controls
                </h2>
                <div className="h-1.5 w-20 bg-[#FFD982]"></div>
              </div>

              <div className="space-y-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                <p>
                  Have questions or want to know more about our specialized
                  electrical projects and services? We’re here to provide expert
                  guidance.
                </p>
                <p>
                  Our technical team is ready to assist with project inquiries,
                  OEM maintenance support, or breakdown services — ensuring
                  prompt and reliable solutions.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-l-4 border-gray-200 pl-6 md:pl-8">
                <a
                  href="tel:+919924129959"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                    <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl md:text-2xl font-bold">
                      call
                    </span>
                  </div>
                  <span className="text-[#0B1221] font-black text-xl md:text-2xl tracking-tighter">
                    +91 99241 29959
                  </span>
                </a>

                <a
                  href="mailto:yogeshwar.controls@yahoo.com"
                  className="flex items-center gap-5 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                    <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl md:text-2xl font-bold">
                      mail
                    </span>
                  </div>
                  <span className="text-[#0B1221] font-black text-[16px] md:text-2xl tracking-tighter break-all">
                    yogeshwar.controls@yahoo.com
                  </span>
                </a>
              </div>
            </div>

            {/* RIGHT SIDE (Mobile optimized spacing) */}
            <div className="reveal-item space-y-12">
              <div className="grid grid-cols-1 mt-8 md:mt-0 md:grid-cols-2 lg:grid-cols-1 gap-10 md:gap-12">
                <div className="group">
                  <p className="text-[#0B1221] font-black uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFD982]"></span> Registered
                    Office
                  </p>
                  <address className="not-italic text-gray-500 font-bold text-base md:text-lg leading-relaxed border-l-2 border-gray-100 pl-4 group-hover:border-[#FFD982] transition-colors">
                    7, Mahavir Flats, Shahpur Chakla,
                    <br /> Ahmedabad – 380001
                  </address>
                </div>

                <div className="group">
                  <p className="text-[#0B1221] font-black uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#0B1221]"></span> Postal
                    Correspondence
                  </p>
                  <address className="not-italic text-gray-500 font-bold text-base md:text-lg leading-relaxed border-l-2 border-gray-100 pl-4 group-hover:border-[#0B1221] transition-colors">
                    30, Sarvoday Nagar-3, Patidar Chowk, <br /> Ghatlodiya,
                    Ahmedabad-380061
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FORM SECTION --- */}
      <section className="py-12 md:py-14 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-start-2 lg:col-span-10 reveal-item mx-auto w-full max-w-4xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
     {/* --- MAP SECTION --- */}
<section className="bg-white pb-16">
  <div className="container mx-auto px-6 md:px-12 lg:px-24">
    <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden h-[350px] md:h-[450px] border border-gray-100 shadow-sm transition-all duration-700">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.603099951664!2d72.577073076045!3d23.03833441574706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e854e720eaccf%3A0xa759b6cb0da46efe!2sMahavir%20flat!5e0!3m2!1sen!2sin!4v1711980000000!5m2!1sen!2sin"
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
</section>
    </main>
  );
}
