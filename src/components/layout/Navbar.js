"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect active route
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ];

  const linkVariants = {
    closed: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 } 
    },
    opened: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[60] px-6 py-6 md:px-16 flex items-center justify-between bg-transparent">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Yogeshwar Controls"
            width={160}
            height={45}
            priority
            className="h-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{ color: isActive ? "#FFDE42" : "white", borderColor: isActive ? "#FFDE42" : "transparent" }}
                className={`font-medium hover:text-[#FFDE42] transition-colors pb-1 tracking-wide text-sm uppercase ${isActive ? "border-b-2" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <a
              href="tel:+919924129959"
              className="hidden sm:flex bg-white/95 backdrop-blur-sm rounded-full items-center p-1 pr-6 shadow-xl hover:scale-102 transition-transform active:scale-95 cursor-pointer group"
            >
              <div className="bg-[#FFDE42] rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-sm transition-colors ">
                <span
                  className="material-symbols-outlined icon-filled text-navy text-[20px]"
                  style={{
                    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  call
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] text-gray-500 font-bold uppercase leading-none mb-1">
                  Enquiry Now
                </span>
                <span className="text-navy font-extrabold text-sm leading-none tracking-tight">
                  +91 99241 29959
                </span>
              </div>
            </a>
          </div>

          {/* Animated Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col justify-center items-center z-[70] w-10 h-10 relative focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${isOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-navy/98 backdrop-blur-md z-[55] flex flex-col pt-40 px-10"
          >
            <div className="flex flex-col gap-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={linkVariants}
                    initial="closed"
                    animate="opened"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      style={{ color: isActive ? "#FFDE42" : "white" }}
                      className="text-4xl font-medium hover:text-[#FFDE42] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 pt-10 border-t border-white/10"
              >
                <p className="text-[#FFDE42] text-sm font-medium uppercase mb-2 tracking-wider">
                  Call Us Today
                </p>
                <a
                  href="tel:+919924129959"
                  className="text-white text-3xl font-medium hover:text-[#FFDE42] transition-colors inline-block active:scale-95"
                >
                  +91 99241 29959
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}