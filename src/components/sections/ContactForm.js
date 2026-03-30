"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    mobile_number: "",
    message: ""
  });

  useGSAP(() => {
    // Single animation for the entire card only
    gsap.from(".contact-card", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "all" // Cleans up GSAP styles after animation finishes
    });
  }, { scope: sectionRef });

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Smooth transition to success state
        gsap.to(".form-inner-container", {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setIsSubmitted(true);
            setLoading(false);
            gsap.fromTo(".success-message", 
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5 }
            );
          }
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#080f20] px-6">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-primary/50" />
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter text-center uppercase">
              Have Questions?
            </h2>
            <div className="h-[1px] w-12 bg-primary/50" />
        </div>

        {/* The Entire Form Card - Animates as one unit */}
        <div className="contact-card bg-[#0B1221] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative min-h-[500px] flex items-center overflow-hidden">
          
          {!isSubmitted ? (
            <div className="form-inner-container w-full relative z-10">
              <form ref={formRef} onSubmit={handleSend} className="flex flex-col gap-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    required
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all"
                    onChange={(e) => setFormData({...formData, from_name: e.target.value})}
                  />
                  <input 
                    required
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all"
                    onChange={(e) => setFormData({...formData, from_email: e.target.value})}
                  />
                </div>

                {/* Mobile Number Row */}
                <div className="flex items-stretch bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-primary focus-within:bg-white/10 transition-all h-[66px] w-full">
                  <div className="px-5 flex items-center bg-white/5 border-r border-white/10 text-primary font-bold text-lg flex-shrink-0">
                    +91
                  </div>
                  <input 
                    required
                    type="tel" 
                    placeholder="Mobile Number" 
                    className="flex-1 bg-transparent border-none px-5 text-white placeholder:text-white/30 outline-none h-full"
                    onChange={(e) => setFormData({...formData, mobile_number: e.target.value})}
                  />
                </div>

                {/* Message Row */}
                <textarea 
                  required
                  placeholder="How can we help you?" 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />

                {/* Submit Button */}
                <div className="flex flex-col items-center pt-2">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full md:w-auto bg-primary hover:bg-white text-navy font-bold py-5 px-14 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform font-bold">send</span>}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="success-message flex flex-col items-center justify-center text-center py-10 w-full">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary text-6xl">verified</span>
              </div>
              <h2 className="text-white text-3xl font-bold mb-3 uppercase tracking-tighter">Thank You!</h2>
              <p className="text-white/60 max-w-sm leading-relaxed mb-8 text-lg">
                Your message has been sent. Our team will contact you shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)} 
                className="text-primary hover:text-white font-bold transition-colors uppercase tracking-widest text-sm flex items-center gap-2 border border-primary/30 px-6 py-3 rounded-full hover:border-white"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}