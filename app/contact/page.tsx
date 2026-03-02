"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Send, 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Instagram,
  ArrowUpRight,
  Check,
  Copy,
  AlertCircle
} from "lucide-react";
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    preferredContact: "email"
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formState.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam protection
    if (honeypot) return;
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSubmitted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#8b5cf6', '#ffffff']
        });
        setFormState({ name: "", email: "", message: "", preferredContact: "email" });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/falouix-dlc", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/fakhr-eddine-aloui-7457991b6/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/f.alouix", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Mail, label: "Email", value: "falouix@falouix.com", href: "mailto:falouix@falouix.com" },
    { icon: Phone, label: "Phone", value: "+39 351 408 8200", href: "tel:+393514088200" },
    { icon: MapPin, label: "Location", value: "Italy", href: "#" },
  ];

  return (
    <section
      ref={sectionRef}
      id='contact'
      className="relative min-h-screen py-32 px-6 bg-[#020617] overflow-hidden"
    >
      {/* Background effects remain the same... */}
      
      <motion.div 
        style={{ y: ySpring, opacity, scale: scaleSpring }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header remains similar... */}
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info with copy functionality */}
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group flex items-center gap-6 p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => item.label !== 'Location' && copyToClipboard(item.value, item.label)}
                >
                  <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <item.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg text-white font-medium group-hover:text-blue-300 transition-colors">{item.value}</p>
                  </div>
                  <AnimatePresence mode="wait">
                    {copied === item.label ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="flex items-center gap-1 text-green-400"
                      >
                        <Check size={16} />
                        <span className="text-sm">Copied</span>
                      </motion.div>
                    ) : (
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 text-slate-400 transition-all" size={20} />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-6">Follow Me</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/[0.08] text-slate-400 hover:text-white hover:border-blue-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form with validation */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            <div className="relative p-8 md:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/[0.08]">
              {/* Honeypot */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute opacity-0 top-0 left-0 h-0 w-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm text-slate-400 uppercase tracking-wider mb-3">
                    Your Name
                  </label>
                  <motion.input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => {
                      setFormState({...formState, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ""});
                    }}
                    className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                      errors.name ? 'border-red-500/50' : 'border-white/10'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300`}
                    placeholder="John Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        id="name-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle size={14} />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm text-slate-400 uppercase tracking-wider mb-3">
                    Email Address
                  </label>
                  <motion.input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({...formState, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ""});
                    }}
                    className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                      errors.email ? 'border-red-500/50' : 'border-white/10'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300`}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        id="email-error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                        role="alert"
                      >
                        <AlertCircle size={14} />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-sm text-slate-400 uppercase tracking-wider mb-3">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {['email', 'phone', 'whatsapp'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormState({...formState, preferredContact: method})}
                        className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                          formState.preferredContact === method
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm text-slate-400 uppercase tracking-wider mb-3">
                    Your Message
                  </label>
                  <motion.textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => {
                      setFormState({...formState, message: e.target.value});
                      if (errors.message) setErrors({...errors, message: ""});
                    }}
                    rows={5}
                    maxLength={500}
                    className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${
                      errors.message ? 'border-red-500/50' : 'border-white/10'
                    } text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all duration-300 resize-none`}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                  />
                  <div className="flex justify-between mt-2">
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          id="message-error"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm flex items-center gap-1"
                          role="alert"
                        >
                          <AlertCircle size={14} />
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span 
                      id="message-help"
                      className={`text-xs ml-auto ${
                        formState.message.length > 450 ? 'text-amber-400' : 'text-slate-500'
                      }`}
                    >
                      {formState.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                    role="alert"
                  >
                    <AlertCircle size={16} />
                    {errors.submit}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all duration-300 ${
                    isSubmitted 
                      ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : isSubmitted ? (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={18} />
                      Message Sent Successfully!
                    </motion.span>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}