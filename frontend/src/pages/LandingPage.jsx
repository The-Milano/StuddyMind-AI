import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  FileText, 
  Target, 
  MessageSquare, 
  History, 
  Download, 
  ShieldCheck, 
  Upload, 
  Brain, 
  Lightbulb 
} from 'lucide-react';

export const LandingPage = () => {
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty('--mouse-x', `${x}px`);
    heroRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18
      }
    }
  };

  const fadeRevealVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col font-body bg-base text-text-primary">
      {/* Aurora Background Blobs */}
      <div className="aurora-bg">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>


      {/* Top Navigation Bar */}
      <nav className="glass-panel sticky top-0 w-full border-b border-border-subtle/30 shadow-sm z-50 bg-base/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full">
          <Link to="/" className="font-display text-2xl font-bold text-accent tracking-tight flex items-center gap-2">
            StudyMind AI
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a className="hover:text-accent transition-colors duration-300" href="#how-it-works">How It Works</a>
            <a className="hover:text-accent transition-colors duration-300" href="#features">Features</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/upload" className="bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 border border-transparent shadow-[0_2px_12px_rgba(194,101,42,0.15)] btn-shimmer flex items-center gap-1.5 text-sm">
              <span>Start for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        
        {/* HERO SECTION */}
        <section 
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative pt-20 pb-28 px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16 min-h-[80vh] justify-center"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15), transparent 40%)'
          }}
        >
          {/* Hero Left Text */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col items-start text-left z-10 max-w-2xl"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 border border-border-subtle/50 mb-8 glass-panel shadow-sm"
            >
              <Sparkles className="text-accent2 w-4 h-4 animate-pulse" />
              <span className="text-xs font-semibold text-text-secondary tracking-wider uppercase">
                Premium Assistant
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-text-primary mb-6"
            >
              Elevate your intellect with <span className="text-accent italic font-serif">warm precision.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
            >
              A beautifully minimalist AI companion that curates your study material, extracts vital insights, and respects your focus.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link to="/upload" className="bg-accent text-white px-8 py-4 rounded-lg font-medium shadow-[0_4px_20px_rgba(194,101,42,0.25)] hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 btn-shimmer">
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="px-8 py-4 rounded-lg font-medium text-text-primary border border-border-default/60 glass-panel hover:bg-surface/30 transition-colors flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-accent" />
                See how it works
              </a>
            </motion.div>
            
            {/* Social Trust Stack */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex items-center gap-4 text-sm text-text-secondary"
            >
              <div className="flex -space-x-3">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-base object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBpXoiNRkzO2GefNSFnxoq5-XFbdkvycJ6mqDXL4ZJJE1WG7_SIDMk6zv20cW6AyCf6NtvmePOGQfjUQfWab6Rg1t_IBWo_0SWrtHqZETpjoCmDq5-J9q8T_81TNHytjHLKThk-xdDIu3M0w6PezjjO6luXaKeLTJrHLZDXFpzKrPLkLI7AdM83DJt3Gn9b5qzUFJEk6WkK6gJDIF8QK_cjOtfYUK4TmSkplUnpGVzVlveJBE4u0yYsqqdsJbTlet115BumoluHK4" />
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-base object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnTqOobNWfLFheQtCbFUn5tI1u20P3o13pWO9kJniDcLshao1sofHkw_dkcrdeobVasZqobh9aneZWNWF82vMFKwNqSGPtOPCeYVn9TJUxNo26zHz6JJW0_E-7AY7Kk-gMwmgcv2-ifQYClmsE8WBmOf69RcIKm7RbBq-Ymg7_SaS4sS4DDjC6zDZ7qc-JnC5_ds1isha6y8WQkas6dV_nBSsssRMrACVbXtvgmzxPFMnVD2PuSLvHk_8E2YVLgZQFjOPhr88ACQQ" />
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-base object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPyiZHN1-9ENexsL01Qw6zV5oPnmJWOUAGAGwzZx4QTfV1GyYEwdxaep7MB38EJXP44CnFf-ZjiOrXuAMNMVgERPCIbFxN_NuS2fXijlySS9WSdzLftfD-WuucFsqTCXfsrcCPbDkviEApIiVtA22YN_9JWQkIaBETx1XdfQIiM_npygx5qYarcuCwX2pX-b4v9RbE9qnBdQgdu0UFBMiiWk1hGCeyGy8fpTYyur2LQA6dVasmsrBe0H4p1nI_AKhS1lxbY00YOPM" />
              </div>
              <p>Trusted by 10,000+ deep thinkers.</p>
            </motion.div>
          </motion.div>
          
          {/* Hero Right Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative w-full lg:w-auto flex justify-center lg:justify-end z-10"
          >
            {/* Abstract glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Glass Mockup Container */}
            <div className="relative w-full max-w-md aspect-[3/4] glass-card-strong rounded-2xl p-6 float-slow border border-border-subtle/50 shadow-2xl flex flex-col justify-between">
              <div>
                {/* Mock UI Header */}
                <div className="flex items-center justify-between border-b border-border-subtle/30 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <FileText className="text-accent w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-medium text-text-primary text-sm">Neuroscience_101.pdf</h3>
                      <p className="text-xs text-text-muted">Summarizing...</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-text-muted/60" />
                  </div>
                </div>
                
                {/* Mock Content */}
                <div className="space-y-4">
                  <div className="h-3.5 bg-border-subtle/50 rounded w-3/4 animate-pulse" />
                  <div className="h-3.5 bg-border-subtle/50 rounded w-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="h-3.5 bg-border-subtle/50 rounded w-5/6 animate-pulse" style={{ animationDelay: '300ms' }} />
                  <div className="h-3.5 bg-border-subtle/50 rounded w-1/2 animate-pulse" style={{ animationDelay: '450ms' }} />
                </div>
              </div>
              
              {/* Floating Insight Card */}
              <div className="w-full glass-panel rounded-xl p-4 border border-border-default/40 shadow-lg float-medium mt-auto self-end transform translate-x-2">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-accent2 w-5 h-5 mt-0.5" />
                  <div>
                    <h4 className="font-headline text-sm font-semibold text-text-primary mb-1">Key Insight</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      The prefrontal cortex demonstrates remarkable plasticity when exposed to consistent deep-work states.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 border-t border-border-subtle/20">
          <motion.div 
            variants={fadeRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-3 block">// Process Flow</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary">How StudyMind Works</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t border-dashed border-border-default/50 -z-10" />
            
            {[
              { icon: Upload, title: "Upload notes", desc: "Drag and drop any PDF or text file, up to 10MB." },
              { icon: Sparkles, title: "AI analysis", desc: "Gemini reads the entire text to map relationships and extract structure." },
              { icon: Brain, title: "Curated learning", desc: "Instantly unlock structured summaries, practice quizzes, and interactive chats." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl glass-panel border border-border-subtle/30"
              >
                <div className="w-16 h-16 rounded-full bg-accent-dim border border-accent-border/50 flex items-center justify-center mb-6 text-accent shadow-sm">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            variants={fadeRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <span className="text-accent font-mono text-xs font-bold tracking-widest uppercase mb-3 block">// Feature Suite</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary">Curated Study Tools</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Smart Summary", desc: "Structured hierarchical markdown outlines that separate concepts clearly, built specifically for light-mode readability." },
              { icon: Target, title: "Quiz Generator", desc: "Generate multi-choice practice tests on the fly with detailed feedback and score trackers." },
              { icon: MessageSquare, title: "Interactive Chatbot", desc: "Ground your questions directly in the uploaded text. No hallucinations, only reliable answers." },
              { icon: History, title: "Session History", desc: "Return to your study documents at any time. Your history is stored safely and loaded on demand." },
              { icon: Download, title: "Clean Export", desc: "Download your generated notes as a standardized text file for offline study or print sheets." },
              { icon: ShieldCheck, title: "Privacy Assured", desc: "Your API keys and documents reside locally on your device. We never store or track your personal notes." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="bg-card/40 backdrop-blur-md border border-border-subtle/50 p-8 rounded-2xl hover:border-accent-border/50 hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group"
              >
                <feature.icon className="text-accent group-hover:text-accent2 transition-colors duration-300 mb-5 w-7 h-7" />
                <h3 className="font-display text-lg font-bold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-24 px-6 text-center border-t border-border-subtle/20 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-dim/10 pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-8">Ready to learn faster?</h2>
            <Link to="/upload" className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 rounded-lg font-medium shadow-[0_4px_20px_rgba(194,101,42,0.25)] hover:bg-accent/90 transition-colors gap-2 btn-shimmer">
              Start for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-border-subtle/30 bg-base z-10 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-accent text-lg">StudyMind AI</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors duration-300">GitHub</a>
            <span className="text-border-strong/40">|</span>
            <span>Built with Gemini API</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
