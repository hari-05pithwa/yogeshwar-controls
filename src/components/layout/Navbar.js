"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const linksRef = useRef([]);

  // Fix for the "jumping" layout: Prevent body shift when scrollbar is hidden
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    const menu = menuRef.current;
    const links = linksRef.current.filter(Boolean);

    if (isOpen) {
      // Ensure menu starts from correct position
      gsap.set(menu, { display: "flex", x: "100%", opacity: 0 });
      
      const tl = gsap.timeline();
      tl.to(menu, { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        ease: "power3.out" 
      })
      .fromTo(links, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power2.out" }, 
        "-=0.2"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(links, { 
        y: 20, 
        opacity: 0, 
        duration: 0.3, 
        stagger: 0.05, 
        ease: "power2.in" 
      })
      .to(menu, { 
        x: "100%", 
        opacity: 0, 
        duration: 0.4, 
        ease: "power3.in",
        onComplete: () => gsap.set(menu, { display: "none" })
      }, "-=0.1");
    }
  }, { dependencies: [isOpen], revertOnUpdate: true });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100]">
        {/* Background Overlay */}
        <div className={`absolute inset-0 transition-all duration-400 ease-out -z-10 ${
          isScrolled || isOpen ? "opacity-100 bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg" : "opacity-0"
        }`} />

        <div className={`container mx-auto px-6 md:px-16 flex items-center justify-between transition-all duration-400 ${
          isScrolled || isOpen ? "py-3" : "py-6"
        }`}>
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={140} height={36} priority className="h-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`nav-link-ltr font-medium text-[18px] transition-colors ${
                  pathname === link.href ? "text-primary" : "text-white hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Call Button */}
            <div className="hidden lg:block">
              <a href="tel:+919924129959" className="call-btn-container group">
                <div className="call-btn-slider" />
                <div className="relative z-20 bg-primary rounded-full w-10 h-10 flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
                  <span className="material-symbols-outlined text-navy text-[20px] group-hover:rotate-[15deg] transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                </div>
                <div className="flex flex-col relative z-10 overflow-hidden">
                  <div className="h-[14px] overflow-hidden">
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-1/2">
                      <span className="text-[10px] text-navy/80 font-medium h-[14px] flex items-center">Enquiry Now</span>
                      <span className="text-[10px] text-navy/90 font-bold h-[14px] flex items-center">Call Us Today</span>
                    </div>
                  </div>
                  <span className="text-navy font-bold text-[14px] mt-0.5">+91 99241 29959</span>
                </div>
              </a>
            </div>

            {/* Mobile Call Icon */}
            <a href="tel:+919924129959" className="lg:hidden w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
               <span className="material-symbols-outlined text-navy text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
            </a>

            {/* Hamburger Menu - Styled as absolute to prevent layout shift */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden w-9 h-9 relative z-[110] flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              <span className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block absolute h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-navy z-[90] hidden flex-col justify-center px-10" 
        style={{ transform: 'translateX(100%)', opacity: 0 }}
      >
        <div className="flex flex-col gap-8 w-full">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name} 
              href={link.href} 
              ref={(el) => (linksRef.current[i] = el)} 
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-medium tracking-tighter transition-colors duration-200 ${
                pathname === link.href ? "text-primary" : "text-white hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div ref={(el) => (linksRef.current[navLinks.length] = el)} className="mt-12 pt-8 border-t border-white/10 w-full">
            <p className="text-primary text-sm font-medium uppercase mb-2 tracking-widest">Contact Support</p>
            <a href="tel:+919924129959" className="text-white text-3xl font-medium tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
              +91 99241 29959
            </a>
          </div>
        </div>
      </div>
    </>
  );
}