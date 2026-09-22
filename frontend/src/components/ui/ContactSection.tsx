'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { ContactPayload } from '@/types';
import { submitContactForm } from '@/lib/api';

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    company: '',
    project_scope: 'Full-Stack Development',
    budget_range: '$5k - $10k',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [responseNotice, setResponseNotice] = useState<string | null>(null);

  const scopeOptions = [
    'Full-Stack Development',
    'AI / Machine Learning Pipeline',
    'Real-Time 3D Web Application',
    'Mobile / PWA Application',
    'Architecture Audit & Security',
  ];

  const budgetOptions = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!formData.message.trim()) {
      setError('Please describe your project scope or objectives.');
      return;
    }

    setLoading(true);

    try {
      const response = await submitContactForm(formData);
      if (response.success) {
        setSubmittedInquiryId(response.inquiry_id || `INQ-${Math.floor(100000 + Math.random() * 900000)}`);
        setResponseNotice(response.message || 'Your project brief has been received.');
      } else {
        setError(response.message || 'Failed to submit inquiry.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      project_scope: 'Full-Stack Development',
      budget_range: '$5k - $10k',
      message: '',
    });

    setSubmittedInquiryId(null);
    setResponseNotice(null);
    setError(null);
  };

  const triggerDirectMailto = () => {
    const subject = encodeURIComponent(`[Project Brief] ${formData.project_scope} - ${formData.name}`);
    const body = encodeURIComponent(
      `New Project Brief Submission for .DEV:\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || 'N/A'}\n` +
      `Project Scope: ${formData.project_scope}\n` +
      `Estimated Budget: ${formData.budget_range}\n\n` +
      `Project Details & Objectives:\n` +
      `--------------------------------------------------\n` +
      `${formData.message}\n` +
      `--------------------------------------------------\n\n` +
      `Submitted via .DEV Web Interface`
    );
    window.location.href = `mailto:darlings_protonmail@protonmail.ch,D0tDev@proton.me?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center gap-4 relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-none my-0">
            Let’s Build Something <span className="text-gradient-cyan">Extraordinary</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed my-0">
            Ready to elevate your engineering standard? Tell us about your project scope and architectural constraints below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6 glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
                Direct Contact & SLAs
              </span>
              <h3 className="text-xl font-bold text-white">
                Guaranteed Sub-12h Response
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We review technical briefs promptly. For urgent architectural consultations or high-scale contracts, submit your project scope below or reach out directly.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center space-x-3 text-slate-300 text-xs font-mono">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-cyan-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">DIRECT EMAIL</span>
                  <a href="mailto:D0tDev@proton.me" className="text-white font-medium hover:text-cyan-400 transition-colors">
                    D0tDev@proton.me
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-300 text-xs font-mono">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px]">TIMEZONE & HOURS</span>
                  <span className="text-white font-medium">UTC / EST (24/7 Monitoring)</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent-cyan/10 border border-primary/20 space-y-2">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                High-Volume Contracting
              </span>
              <p className="text-xs text-slate-300 leading-normal">
                Looking for dedicated end-to-end full stack development or AI integration? We deliver fully tested, production-ready code with complete documentation.
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submittedInquiryId ? (
                /* Success Animated View */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-neon-cyan">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Inquiry Transmitted!</h3>
                    <p className="text-xs font-mono text-cyan-400">
                      Tracking Reference ID: <span className="text-white font-bold">{submittedInquiryId}</span>
                    </p>
                    <p className="text-sm text-slate-300 max-w-md mx-auto pt-2">
                      {responseNotice}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={triggerDirectMailto}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Send Backup Copy via Mail App</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Form Inputs View */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Project Scope</label>
                      <select
                        value={formData.project_scope}
                        onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {scopeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Estimated Budget</label>
                      <select
                        value={formData.budget_range}
                        onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-950 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Project Details & Objectives *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your application goals, target architecture, key deliverables, and preferred launch timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-indigo-600 to-accent-cyan text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary/30 hover:shadow-neon-indigo transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="font-mono text-xs animate-pulse">Transmitting Brief to API...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
