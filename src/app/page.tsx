"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import VideoModal from "@/components/ui/VideoModal";
import YouTubeThumbnail from "@/components/ui/YouTubeThumbnail";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import SocialProof from "@/components/sections/SocialProof";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import { useFeatureFlags } from "@/lib/feature-flags";

const VIDEO_URL = "https://youtu.be/MmAnR4YAPv4";

// ─── Hero animation variant (always visible on load) ─────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// ─── IntersectionObserver hook for scroll reveals ────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  const { isEnabled } = useFeatureFlags();
  useScrollReveal();

  return (
    <div className="overflow-hidden" style={{ background: '#ffffff', color: '#181d26' }}>

      {/* ═══════════════════════════════════════════════════
          HERO — Blue gradient + Fintech elements
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0a1f6e 0%, #1b61c9 55%, #0d3599 100%)', minHeight: 600 }}
      >
        {/* Radial glow blobs */}
        <div className="pointer-events-none absolute -right-20 top-0 h-[700px] w-[700px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />

        {/* Circuit board grid pattern */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40h22M58 40h22M40 0v22M40 58v22" stroke="white" strokeWidth="1" fill="none"/>
              <circle cx="40" cy="40" r="3.5" fill="white"/>
              <circle cx="0"  cy="40" r="2"   fill="white" opacity="0.7"/>
              <circle cx="80" cy="40" r="2"   fill="white" opacity="0.7"/>
              <circle cx="40" cy="0"  r="2"   fill="white" opacity="0.7"/>
              <circle cx="40" cy="80" r="2"   fill="white" opacity="0.7"/>
              <rect x="14" y="14" width="12" height="12" rx="2" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4"/>
              <rect x="54" y="54" width="12" height="12" rx="2" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-circuit)"/>
        </svg>

        {/* Floating candlestick chart */}
        <div className="pointer-events-none absolute right-[8%] top-[12%] opacity-25 animate-float">
          <svg width="130" height="90" viewBox="0 0 130 90">
            <line x1="12" y1="10" x2="12" y2="75" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="28" y1="15" x2="28" y2="68" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="44" y1="8"  x2="44" y2="60" stroke="#ef4444" strokeWidth="1.5"/>
            <line x1="60" y1="20" x2="60" y2="70" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="76" y1="5"  x2="76" y2="55" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="92" y1="12" x2="92" y2="65" stroke="#10b981" strokeWidth="1.5"/>
            <line x1="108" y1="3" x2="108" y2="50" stroke="#10b981" strokeWidth="1.5"/>
            <rect x="8"   y="30" width="8" height="30" rx="1" fill="#10b981"/>
            <rect x="24"  y="28" width="8" height="25" rx="1" fill="#10b981"/>
            <rect x="40"  y="22" width="8" height="28" rx="1" fill="#ef4444"/>
            <rect x="56"  y="35" width="8" height="22" rx="1" fill="#10b981"/>
            <rect x="72"  y="18" width="8" height="26" rx="1" fill="#10b981"/>
            <rect x="88"  y="24" width="8" height="28" rx="1" fill="#10b981"/>
            <rect x="104" y="12" width="8" height="28" rx="1" fill="#10b981"/>
          </svg>
        </div>

        {/* Floating trend line */}
        <div className="pointer-events-none absolute left-[5%] bottom-[20%] opacity-20 animate-float-slow">
          <svg width="200" height="80" viewBox="0 0 200 80">
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polyline
              points="0,75 35,60 70,55 100,38 130,28 165,15 200,5"
              fill="none" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="animate-draw"
            />
            <polygon
              points="0,80 0,75 35,60 70,55 100,38 130,28 165,15 200,5 200,80"
              fill="url(#trendGrad)"
            />
          </svg>
        </div>

        {/* Data dots */}
        <div className="pointer-events-none absolute right-[22%] top-[20%] h-3 w-3 rounded-full bg-white opacity-60 animate-data-pulse" />
        <div className="pointer-events-none absolute right-[35%] top-[55%] h-2 w-2 rounded-full bg-white opacity-40 animate-data-pulse-delay" />
        <div className="pointer-events-none absolute left-[20%] top-[30%] h-2.5 w-2.5 rounded-full bg-white opacity-50 animate-data-pulse-slow" />
        <div className="pointer-events-none absolute left-[40%] bottom-[25%] h-2 w-2 rounded-full bg-white opacity-35 animate-data-pulse" />

        {/* Mini ticker badge */}
        <div className="pointer-events-none absolute right-[4%] bottom-[28%] opacity-35 animate-float-delay hidden lg:block"
          style={{ transform: 'rotate(-5deg)' }}>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.65rem', color: 'white', fontWeight: 600 }}>
            <span style={{ color: '#10b981' }}>▲ +12.48%</span>
            <span style={{ opacity: 0.7 }}>THIS MONTH</span>
          </div>
        </div>

        {/* Light beam */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)' }} />

        {/* ── Hero content ── */}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-24">

          {/* LEFT: Copy */}
          <div>
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', backdropFilter: 'blur(8px)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              AI-Powered Finance Platform
            </motion.div>

            <motion.h1
              variants={fadeUp} initial="hidden" animate="show" custom={1}
              className="font-bold tracking-tight text-white"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
            >
              A Smarter Entry Point
              <br />
              <span style={{ opacity: 0.88 }}>Into AI-Driven Finance</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} initial="hidden" animate="show" custom={2}
              className="mt-6 max-w-lg text-[1.1rem] leading-8"
              style={{ color: 'rgba(255,255,255,0.78)' }}
            >
              Automated performance, digital banking, crypto tools — ready to
              capitalize on the future of finance.
            </motion.p>

            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link href="/signup" className="btn-white text-[0.95rem] px-7 py-3">
                Get Started Free →
              </Link>
              <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                <button className="btn-ghost-white text-[0.95rem] px-6 py-3">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  Watch Overview
                </button>
              </VideoModal>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={4}
              className="mt-9 flex flex-wrap items-center gap-5 text-xs font-semibold"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {["No Credit Card Required", "Free to Get Started", "18,000+ Active Partners"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 shrink-0" style={{ color: '#7dd3fc' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Dashboard mockup */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={1.5}
            className="mx-auto w-full max-w-[580px] lg:max-w-none"
          >
            <div className="overflow-hidden" style={{ borderRadius: 18, boxShadow: '0 40px 100px rgba(0,10,50,0.55), 0 0 0 1px rgba(255,255,255,0.12)' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#e2e8f0' }}>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                <div className="ml-3 flex-1 rounded bg-white/60 px-3 py-0.5 text-[0.6rem] font-medium text-slate-500 text-center tracking-wide">
                  app.autopilotroi.com
                </div>
              </div>
              {/* Video/mockup */}
              <div className="relative" style={{ height: 320 }}>
                <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                  <button className="relative block h-full w-full cursor-pointer overflow-hidden">
                    <YouTubeThumbnail videoId="MmAnR4YAPv4" title="Aurum Platform Overview"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all hover:scale-110"
                        style={{ background: '#e12a2b', boxShadow: '0 8px 24px rgba(225,42,43,0.55)' }}>
                        <svg viewBox="0 0 24 24" className="h-7 w-7 ml-1 fill-white">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3">
                      <span className="flex items-center gap-2 text-xs font-semibold text-white/90">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                        </div>
                        Watch Overview
                      </span>
                      <span className="rounded bg-black/40 px-2 py-0.5 text-[0.6rem] font-medium text-white/80 backdrop-blur-sm">15:22</span>
                    </div>
                  </button>
                </VideoModal>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FEATURE HIGHLIGHTS — 3 pillars on white
      ═══════════════════════════════════════════════════ */}
      <section className="section-white" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: <BotFeatureIcon />, title: 'AI Automation', desc: 'Automated performance with advanced crypto-fintech tools that work 24/7 for you.', iconBg: '#1b61c9' },
              { icon: <CardFeatureIcon />, title: 'Digital Banking', desc: 'Full control of your funds with modern banking features and seamless fiat integration.', iconBg: '#0070cc' },
              { icon: <GlobeFeatureIcon />, title: 'Crypto Infrastructure', desc: 'Access and manage the tools of the new financial system — exchange, cards, and more.', iconBg: '#254fad' },
            ].map((f, i) => (
              <div key={f.title} className="card p-7 reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{ background: f.iconBg, boxShadow: '0 4px 12px rgba(27,97,201,0.28)' }}>
                  {f.icon}
                </div>
                <h3 className="mb-2 text-[1.0625rem] font-bold" style={{ color: '#181d26' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.72)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          METRICS BAR
      ═══════════════════════════════════════════════════ */}
      <section className="section-surface" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { value: 18000, label: 'Active Partners', suffix: '+', prefix: '' },
              { value: 30,    label: 'Assets Managed',  suffix: 'M+', prefix: '$' },
              { value: 5,     label: 'Tech Products',   suffix: '', prefix: '' },
              { value: 3,     label: "Int'l Licenses",  suffix: '', prefix: '' },
            ].map((m, i) => (
              <div key={m.label} className="reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl font-bold sm:text-[3rem]" style={{ color: '#1b61c9', letterSpacing: '-0.03em' }}>
                  <NumberTicker value={m.value} prefix={m.prefix} suffix={m.suffix} delay={0.2 + i * 0.15} />
                </div>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: 'rgba(4,14,32,0.55)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          AS SEEN IN
      ═══════════════════════════════════════════════════ */}
      <section className="py-10 lg:py-12" style={{ background: '#ffffff', borderBottom: '1px solid #e0e2e6' }}>
        <div className="container">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(4,14,32,0.50)' }}>As Seen In</p>
          <Marquee pauseOnHover gap="3rem" duration="30s" className="[--marquee-gap:3rem]">
            <svg className="h-6 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 150 40" fill="currentColor">
              <text x="0" y="32" fontFamily="Georgia, serif" fontWeight="700" fontSize="36" letterSpacing="-1">Forbes</text>
            </svg>
            <svg className="h-5 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 200 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22">Cointelegraph</text>
            </svg>
            <svg className="h-5 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 150 30" fill="currentColor">
              <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5">BENZINGA</text>
            </svg>
            <svg className="h-5 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 160 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22">Bitcoin.com</text>
            </svg>
            <svg className="h-5 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 210 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20">GlobeNewswire</text>
            </svg>
            <svg className="h-5 flex-shrink-0 transition" style={{ color: 'rgba(4,14,32,0.35)' }} viewBox="0 0 180 30" fill="currentColor">
              <text x="0" y="23" fontFamily="monospace" fontWeight="700" fontSize="22">Hackernoon</text>
            </svg>
          </Marquee>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRODUCT ECOSYSTEM — "One Platform. Five Revenue Streams."
      ═══════════════════════════════════════════════════ */}
      <section className="section-white">
        <div className="container">
          <div className="mb-14 text-center reveal">
            <span className="section-eyebrow">Ecosystem</span>
            <h2 className="section-heading">One Platform. Five Revenue Streams.</h2>
            <p className="section-sub mx-auto max-w-xl">
              Everything you need to build, manage, and grow automated crypto wealth — all in one ecosystem.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'EX-AI Bot',    desc: 'Automated crypto trading with 10.5%–16.6% monthly returns. Set it and let AI do the work.', stat: '~10.5–16.6% /mo', icon: '🤖', badgeCls: 'badge-blue' },
              { title: 'Zeus AI Bot',  desc: 'Next-gen trading engine designed for consistent, stable performance across market conditions.', stat: 'Advanced AI',   icon: '⚡', badgeCls: 'badge-purple' },
              { title: 'NeoBank',      desc: 'Seamless fiat-to-crypto banking with instant transactions. Manage your finances in one place.', stat: 'Instant transfers', icon: '🏦', badgeCls: 'badge-teal' },
              { title: 'Crypto Card',  desc: 'Spend your crypto earnings anywhere. Accepted at 80M+ merchants worldwide via Visa.', stat: 'Visa®',           icon: '💳', badgeCls: 'badge-success' },
              { title: 'Exchange',     desc: 'Buy, sell, and swap 200+ crypto pairs with ultra-low fees and institutional-grade security.', stat: '200+ pairs',    icon: '📊', badgeCls: 'badge-warning' },
              { title: 'RWA Gold (XAU)', desc: 'Tokenized gold packages. Own real-world assets with 63–70% annual returns, Swiss vault delivery.', stat: '63–70% /yr',  icon: '🥇', badgeCls: 'badge-navy' },
            ].map((p, i) => (
              <div key={p.title} className="card p-6 group reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.icon}</span>
                    <h3 className="text-[1rem] font-bold" style={{ color: '#181d26' }}>{p.title}</h3>
                  </div>
                  <span className={`badge ${p.badgeCls} flex-shrink-0`}>{p.stat}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(4,14,32,0.72)' }}>{p.desc}</p>
                <Link href="/products"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: '#1b61c9' }}>
                  Learn More →
                </Link>
              </div>
            ))}
          </div>

          {/* Calculator CTA */}
          <div className="mt-8 reveal">
            <Link href="/calculator"
              className="group flex items-center gap-6 rounded-2xl p-7 transition-all"
              style={{ background: 'linear-gradient(135deg, #eef4ff 0%, #f8fafc 50%, #eef4ff 100%)', border: '1px solid #c7d8f5' }}>
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl text-white"
                style={{ background: '#1b61c9', boxShadow: '0 4px 14px rgba(27,97,201,0.30)' }}>
                📈
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold" style={{ color: '#181d26' }}>See What Your Investment Could Become</h3>
                <p className="mt-0.5 text-sm" style={{ color: 'rgba(4,14,32,0.72)' }}>
                  Use our Profit Calculator to model your returns across all tiers — with compound interest.
                </p>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition group-hover:scale-105"
                style={{ background: '#1b61c9', boxShadow: '0 4px 14px rgba(27,97,201,0.30)' }}>
                Open Calculator →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          OUR PRODUCT SUITE — Blue bg, white cards
      ═══════════════════════════════════════════════════ */}
      <section
        id="product-suite"
        className="relative overflow-hidden px-6 py-24 lg:px-10"
        style={{ background: 'linear-gradient(160deg, #0d2480 0%, #1b61c9 60%, #0f3aaa 100%)' }}
      >
        {/* Subtle circuit overlay */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="suite-circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30h15M45 30h15M30 0v15M30 45v15" stroke="white" strokeWidth="0.8" fill="none"/>
              <circle cx="30" cy="30" r="2.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#suite-circuit)"/>
        </svg>

        <div className="relative z-10 container">
          <div className="mb-12 text-center reveal">
            <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              Product Suite
            </span>
            <h2 className="text-[2.2rem] font-bold tracking-tight text-white sm:text-[2.8rem]" style={{ letterSpacing: '-0.02em' }}>
              Our Product Suite
            </h2>
            <p className="mx-auto mt-3 max-w-lg" style={{ color: 'rgba(255,255,255,0.82)' }}>
              Four powerful products. One unified ecosystem.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "BOTS",        desc: "Automated trading strategies that work 24/7 for you.",          icon: <BotIcon />, badge: "Most Popular", href: "/products#bots" },
              { title: "CRYPTO CARD", desc: "Spend your digital assets anywhere, anytime.",                  icon: <CardIcon />, badge: null, href: "/products#cards" },
              { title: "EXCHANGE",    desc: "Buy, sell and manage crypto with low fees.",                    icon: <ExchangeIcon />, badge: null, href: "/products#exchange" },
              { title: "NEO BANK",    desc: "Seamless fiat and crypto banking in one secure app.",           icon: <BankIcon />, badge: "Coming Soon", href: "/products#neobank" },
            ].map((card, i) => (
              <div key={card.title} className="reveal" style={{ animationDelay: `${i * 0.12}s` }}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-1"
                  style={{ boxShadow: '0 8px 32px rgba(0,10,40,0.28)' }}>
                  {/* Image area */}
                  <div className="relative flex h-44 items-center justify-center"
                    style={{ background: 'linear-gradient(160deg, #eef4ff 0%, #f0f6ff 100%)' }}>
                    {card.badge && (
                      <div className="absolute right-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white"
                        style={{ background: '#1b61c9' }}>
                        {card.badge}
                      </div>
                    )}
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl text-white text-3xl"
                      style={{ background: 'linear-gradient(135deg, #1b61c9 0%, #254fad 100%)', boxShadow: '0 8px 20px rgba(27,97,201,0.30)' }}>
                      {card.icon}
                    </div>
                  </div>
                  {/* Body */}
                  <div className="flex flex-1 flex-col items-center p-5 text-center">
                    <h3 className="mb-2 text-[0.95rem] font-bold tracking-tight" style={{ color: '#181d26' }}>
                      {card.title}
                    </h3>
                    <p className="mb-5 flex-1 text-[0.875rem] leading-relaxed" style={{ color: 'rgba(4,14,32,0.72)' }}>
                      {card.desc}
                    </p>
                    <Link href={card.href} className="btn-primary w-full justify-center text-sm py-2.5">
                      Learn More →
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ACTION STEPS
      ═══════════════════════════════════════════════════ */}
      <section id="how-it-works" className="section-surface">
        <div className="container">
          <div className="mb-14 text-center reveal">
            <h2 className="section-heading">
              <span style={{ color: '#1b61c9' }}>Action Steps:</span> Register Your AutopilotROI Account
            </h2>
            <p className="section-sub">Follow these steps to unlock access to the onboarding system and begin your setup.</p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Steps */}
            <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { num: 1, title: 'Click "Get Started"',     desc: 'Press the button below to begin your free registration.', icon: <CursorIcon /> },
                { num: 2, title: 'Create Your Free Account', desc: 'Enter your details and create a secure account.', icon: <UserPlusIcon /> },
                { num: 3, title: 'Verify & Log In',          desc: 'Check your email to verify, then log in to your account.', icon: <VerifyIcon /> },
                { num: 4, title: 'Access Your Dashboard',    desc: 'Start your onboarding and unlock all your tools.', icon: <DashboardIcon /> },
              ].map((step, i) => (
                <div key={step.num} className="card flex flex-col p-6 reveal" style={{ animationDelay: `${i * 0.12}s` }}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: '#1b61c9', boxShadow: '0 4px 12px rgba(27,97,201,0.36)' }}>
                      {step.num}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(4,14,32,0.52)' }}>
                      Step {step.num}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[0.95rem] font-bold" style={{ color: '#181d26' }}>{step.title}</h3>
                  <p className="mb-4 flex-1 text-[0.875rem] leading-relaxed" style={{ color: 'rgba(4,14,32,0.72)' }}>{step.desc}</p>
                  <div style={{ color: '#1b61c9' }}>{step.icon}</div>
                </div>
              ))}
            </div>

            {/* Device mockup */}
            <div className="relative flex w-full items-end justify-center lg:w-[340px] lg:flex-shrink-0 reveal">
              <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: 'rgba(27,97,201,0.08)' }} />
              {/* Laptop */}
              <div className="relative z-10 w-[300px] overflow-hidden rounded-t-xl px-2 pt-2"
                style={{ background: '#1e293b', borderBottom: '4px solid #94a3b8', boxShadow: '0 20px 50px rgba(0,0,0,0.18)' }}>
                <div className="flex h-52 flex-col overflow-hidden rounded-t-sm bg-white">
                  <div className="flex h-4 items-center gap-1 px-2" style={{ background: '#f8f9fa', borderBottom: '1px solid #e2e8f0' }}>
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="mx-auto text-[0.45rem] text-slate-400 font-medium">app.autopilotroi.com</div>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="text-[0.5rem] font-bold uppercase tracking-wider" style={{ color: 'rgba(4,14,32,0.45)' }}>Dashboard</div>
                    <div className="mt-1 text-xl font-bold" style={{ color: '#181d26' }}>$24,529.00</div>
                    <div className="mt-0.5 text-[0.55rem] font-semibold" style={{ color: '#10b981' }}>▲ +12.48% this month</div>
                    <svg viewBox="0 0 200 70" className="mt-2 h-16 w-full overflow-visible">
                      <defs>
                        <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1b61c9" stopOpacity="0.18"/>
                          <stop offset="100%" stopColor="#1b61c9" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d="M0 55 C30 45, 60 55, 90 38 S140 10, 180 8 L200 5 L200 70 L0 70 Z" fill="url(#dashGrad)"/>
                      <path d="M0 55 C30 45, 60 55, 90 38 S140 10, 180 8 L200 5" fill="none" stroke="#1b61c9" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Phone */}
              <div className="absolute -left-4 bottom-0 z-20 w-[105px] overflow-hidden rounded-2xl bg-white"
                style={{ border: '4px solid #0f172a', boxShadow: '10px 10px 30px rgba(0,0,0,0.20)' }}>
                <div className="flex justify-center bg-white pb-1 pt-2">
                  <div className="h-1 w-8 rounded-full bg-slate-200" />
                </div>
                <div className="flex min-h-[140px] flex-col gap-2 px-2.5 pb-4 pt-2" style={{ background: '#f8fafc' }}>
                  <div className="text-center text-[0.5rem] font-bold" style={{ color: '#1b61c9' }}>🔵 AutopilotROI</div>
                  <div className="mt-1 text-[0.4rem] font-medium" style={{ color: 'rgba(4,14,32,0.65)' }}>Email</div>
                  <div className="flex h-5 items-center rounded px-1.5 text-[0.4rem] text-slate-300" style={{ border: '1px solid #e2e8f0', background: 'white' }}>name@email.com</div>
                  <div className="text-[0.4rem] font-medium" style={{ color: 'rgba(4,14,32,0.65)' }}>Password</div>
                  <div className="flex h-5 items-center rounded px-1.5 text-[0.4rem] text-slate-300" style={{ border: '1px solid #e2e8f0', background: 'white' }}>••••••••</div>
                  <div className="mt-1 flex h-5 items-center justify-center rounded text-[0.45rem] font-bold text-white"
                    style={{ background: '#1b61c9' }}>
                    Login
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold" style={{ color: 'rgba(4,14,32,0.65)' }}>
            {["✓ Quick & Easy", "✓ Secure", "✓ Get Started in Minutes"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      {isEnabled('socialProof') && <SocialProof />}

      {/* ═══════════════════════════════════════════════════
          BOTTOM CTA — Solid Airtable Blue band
      ═══════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 py-24 text-center lg:px-10"
        style={{ background: 'linear-gradient(135deg, #1250b0 0%, #1b61c9 50%, #1558c0 100%)' }}
      >
        {/* Subtle circuit bg */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M0 40h22M58 40h22M40 0v22M40 58v22" stroke="white" strokeWidth="1" fill="none"/>
              <circle cx="40" cy="40" r="3" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-circuit)"/>
        </svg>
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)' }} />

        <div className="relative z-10 container text-center reveal">
          <h2 className="text-[2rem] font-bold text-white sm:text-[2.75rem]" style={{ letterSpacing: '-0.02em' }}>
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.88)' }}>
            Join thousands of members already building their financial future through the Aurum AI ecosystem — guided every step of the way.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/signup" className="btn-white text-[1.05rem] px-9 py-4">
              Get Started Free →
            </Link>
            <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
              <button className="btn-ghost-white text-[1.05rem] px-8 py-4">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg>
                Watch Demo
              </button>
            </VideoModal>
          </div>
        </div>
      </section>

      {/* EXIT INTENT POPUP */}
      {isEnabled('exitIntentPopup') && <ExitIntentPopup />}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function BotFeatureIcon() {
  return <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5A2.5 2.5 0 0 0 7.5 18A2.5 2.5 0 0 0 10 15.5A2.5 2.5 0 0 0 7.5 13m9 0A2.5 2.5 0 0 0 14 15.5A2.5 2.5 0 0 0 16.5 18A2.5 2.5 0 0 0 19 15.5A2.5 2.5 0 0 0 16.5 13z"/></svg>;
}
function CardFeatureIcon() {
  return <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>;
}
function GlobeFeatureIcon() {
  return <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.65 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zm1.79-5.56c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>;
}
function BotIcon() {
  return <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>;
}
function CardIcon() {
  return <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current"><path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>;
}
function ExchangeIcon() {
  return <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>;
}
function BankIcon() {
  return <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current"><path d="M4 10v10h4V10zm6 0v10h4V10zm-8 12h20v-2H2v2zm14-12v10h4V10zM11.5 1L2 6v2h20V6z"/></svg>;
}
function CursorIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 4.702z"/></svg>;
}
function UserPlusIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
}
function VerifyIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>;
}
function DashboardIcon() {
  return <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
}
