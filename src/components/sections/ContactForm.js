"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactForm() {
  const sectionRef = useRef(null);
  const alertRef = useRef(null);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ show: false, text: "" });
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    mobile_number: "",
    message: "",
  });

  // --- Smooth Exit for Manual Close ---
  const closeAlert = () => {
    gsap.to(alertRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setAlertMsg({ show: false, text: "" })
    });
  };

  const showAlert = (text) => {
    setAlertMsg({ show: true, text });
  };

  useGSAP(() => {
    if (alertMsg.show) {
      const tl = gsap.timeline();
      
      // Entry Animation
      tl.fromTo(alertRef.current, 
        { y: 50, opacity: 0, scale: 0.9 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // Auto-exit after 4 seconds if not closed manually
      tl.to(alertRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        delay: 2,
        ease: "power2.in",
        onComplete: () => setAlertMsg({ show: false, text: "" })
      });
    }
  }, [alertMsg.show]);

  const validateForm = () => {
    const { from_name, from_email, mobile_number, message } = formData;

    if (from_name.trim().length < 2) {
      showAlert("Please enter your full name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      showAlert("Please provide a valid email address.");
      return false;
    }

    if (mobile_number.length !== 10) {
      showAlert("Phone number must be exactly 10 digits.");
      return false;
    }

    // --- Added Validation for Message Field ---
    if (message.trim().length === 0) {
      showAlert("Please enter your message.");
      return false;
    }

    return true;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        gsap.to(".form-inner-container", {
          opacity: 0,
          y: -15,
          duration: 0.4,
          onComplete: () => {
            setIsSubmitted(true);
            setLoading(false);
            setTimeout(() => {
              gsap.fromTo(".success-message", 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.6 }
              );
            }, 50);
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      setLoading(false);
      showAlert("Connection error. Please try again.");
    }
  };

  return (
    <section ref={sectionRef} className="py-12 bg-white px-6 relative">
      
      {/* RESPONSIVE SMOOTH ALERT */}
      {alertMsg.show && (
        <div className="fixed bottom-10 left-0 right-0 md:left-auto md:right-10 z-[100] flex justify-center md:justify-end px-6 pointer-events-none">
          <div 
            ref={alertRef}
            className="pointer-events-auto flex items-center gap-4 bg-[#0B1221] border border-white/10 text-white px-5 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] min-w-[300px]"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFD982] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#0B1221] text-[18px] font-bold">priority_high</span>
            </div>
            
            <p className="text-sm font-bold tracking-tight flex-1">{alertMsg.text}</p>

            <button 
              onClick={closeAlert}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-white/50 text-[20px]">close</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto w-full">
        <SectionHeader title="Get In Touch" subtitle="Partner with Yogeshwar Controls for precision electrical solutions." />

        <div className="mt-10">
          {!isSubmitted ? (
            <div className="form-inner-container w-full max-w-xl mx-auto">
              <form onSubmit={handleSend} className="space-y-4">
                <input
                  required
                  type="text"
                  value={formData.from_name}
                  placeholder="Your Name"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-slate-900 outline-none focus:ring-1 focus:ring-[#FFD982] focus:bg-white transition-all"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^[A-Za-z\s]+$/.test(val)) setFormData({...formData, from_name: val});
                  }}
                />

                <input
                  required
                  type="email"
                  value={formData.from_email}
                  placeholder="Your Email"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-slate-900 outline-none focus:ring-1 focus:ring-[#FFD982] focus:bg-white transition-all"
                  onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                />

                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl focus-within:ring-1 focus-within:ring-[#FFD982] focus-within:bg-white transition-all">
                  <span className="pl-5 pr-2 text-slate-500 font-medium">+91</span>
                  <input
                    required
                    type="tel"
                    value={formData.mobile_number}
                    placeholder="Mobile Number"
                    className="w-full bg-transparent p-5 text-slate-900 outline-none"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || (/^\d+$/.test(val) && val.length <= 10)) setFormData({...formData, mobile_number: val});
                    }}
                  />
                </div>

                <textarea
                  required
                  value={formData.message}
                  placeholder="Message..."
                  rows={6}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-slate-900 outline-none focus:ring-1 focus:ring-[#FFD982] focus:bg-white transition-all resize-none"
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                <div className="pt-2 flex flex-col items-start">
                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-[#FFD982] hover:bg-[#0B1221] hover:text-white text-[#0B1221] font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition-all group disabled:opacity-50 shadow-lg active:scale-95"
                  >
                    {loading ? "Sending..." : "Submit"}
                    {!loading && <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">chevron_right</span>}
                  </button>
                  
                </div>
              </form>
            </div>
          ) : (
            <div className="success-message flex flex-col items-center justify-center text-center py-12 px-8 w-full max-w-xl mx-auto bg-[#0B1221] border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="w-16 h-16 bg-[#FFD982] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#FFD982]/20">
                <span className="material-symbols-outlined text-[#0B1221] text-4xl font-bold">check</span>
              </div>
              <h2 className="text-[#FFD982] text-2xl font-black uppercase tracking-tight mb-2">Message Sent</h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Thank you, <b>{formData.from_name}</b>. We have received your details and will contact you on <b>{formData.mobile_number}</b> soon.
              </p>
              <button
                onClick={() => {
                  setFormData({ from_name: "", from_email: "", mobile_number: "", message: "" });
                  setIsSubmitted(false);
                }}
                className="text-[#FFD982] text-xs font-bold uppercase tracking-widest border-b border-[#FFD982]/30 pb-1 hover:text-white transition-all"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}