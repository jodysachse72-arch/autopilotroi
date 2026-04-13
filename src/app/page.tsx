"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VideoModal from "@/components/ui/VideoModal";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { ThreeDCard } from "@/components/ui/three-d-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import YouTubeThumbnail from "@/components/ui/YouTubeThumbnail";
import SocialProof from "@/components/sections/SocialProof";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";
import { useFeatureFlags } from "@/lib/feature-flags";

const VIDEO_URL = "https://youtu.be/MmAnR4YAPv4";

// ─── Fade-up animation variant ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function HomePage() {
  const { isEnabled } = useFeatureFlags();

  return (
    <div className="overflow-hidden bg-white text-slate-900 font-sans">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section data-dark className="relative overflow-hidden bg-[#061238] text-white min-h-[580px]">
        {/* Aceternity Spotlight — top-right dramatic glow */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#60a5fa"
        />

        {/* Aceternity Background Beams — diagonal light rays */}
        <BackgroundBeams className="opacity-60" />

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10 lg:py-24">

          {/* ── LEFT: Hero Copy ── */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              <AnimatedShinyText className="text-blue-300">
                AI-Powered Finance Platform
              </AnimatedShinyText>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-[2.8rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.8rem]"
            >
              Automated Wealth Building
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-white bg-clip-text text-transparent">
                Starts Here
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-lg text-[1.05rem] leading-8 text-blue-100/70"
            >
              Automated performance, digital banking, crypto tools — ready to
              capitalize on the future of finance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link href="/signup">
                <ShimmerButton
                  id="hero-start-here"
                  className="text-[1.05rem]"
                >
                  Start Here →
                </ShimmerButton>
              </Link>

              <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                <button
                  className="flex items-center gap-2 text-[1rem] font-medium text-blue-200 transition hover:text-white"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  Watch Overview
                </button>
              </VideoModal>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-10 flex items-center gap-6 text-xs text-blue-300/60 font-medium"
            >
              {["No Credit Card Required", "Free to Get Started", "18,000+ Active Partners Worldwide"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="h-3 w-3 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Dashboard Mockup with Video Play Button ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.5}
            className="mx-auto w-full max-w-[600px] lg:max-w-none"
          >
            <div className="overflow-hidden rounded-[1.2rem] border border-blue-300/20 bg-slate-50 shadow-[0_30px_80px_rgba(0,5,30,0.8),0_0_0_1px_rgba(59,130,246,0.1)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 bg-[#e2e8f0] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                <div className="ml-3 flex-1 rounded bg-white/60 px-3 py-0.5 text-[0.6rem] font-medium text-slate-500 text-center tracking-wide">
                  app.autopilotroi.com
                </div>
              </div>

              {/* Video thumbnail content */}
              <div className="relative" style={{ height: 310 }}>
                <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                  <button className="relative block h-full w-full cursor-pointer overflow-hidden">
                    {/* YouTube thumbnail */}
                    <YouTubeThumbnail
                      videoId="MmAnR4YAPv4"
                      title="Aurum Platform Overview"
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 transition-colors hover:from-black/50 hover:via-black/10 hover:to-transparent" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e12a2b] shadow-[0_8px_24px_rgba(225,42,43,0.5)] transition-all hover:scale-110 hover:shadow-[0_12px_32px_rgba(225,42,43,0.65)]">
                        <svg viewBox="0 0 24 24" className="h-7 w-7 ml-1 fill-white">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Bottom label */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                        </div>
                        <span className="text-xs font-semibold text-white/90">Watch Overview</span>
                      </div>
                      <span className="rounded bg-black/40 px-2 py-0.5 text-[0.6rem] font-medium text-white/80 backdrop-blur-sm">15:22</span>
                    </div>
                  </button>
                </VideoModal>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AURUM METRICS BAR
      ═══════════════════════════════════════════════ */}
      <section data-dark className="relative z-10 border-t border-blue-500/10 bg-[#040e2d] px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: 18000, label: 'Active Partners', suffix: '+', prefix: '' },
              { value: 30, label: 'Assets Managed', suffix: 'M+', prefix: '$' },
              { value: 5, label: 'Tech Products', suffix: '', prefix: '' },
              { value: 3, label: "Int'l Licenses", suffix: '', prefix: '' },
            ].map((m, i) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="text-center"
              >
                <div className="font-[var(--font-sora)] text-3xl font-extrabold sm:text-4xl lg:text-5xl bg-gradient-to-b from-white via-blue-100 to-blue-300/60 bg-clip-text text-transparent">
                  <NumberTicker value={m.value} prefix={m.prefix} suffix={m.suffix} delay={0.2 + i * 0.15} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/40">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AS SEEN IN — Real SVG Media Logos
      ═══════════════════════════════════════════════ */}
      <section className="relative z-10 bg-[#f8fafc] dark:bg-[#050f2e] border-t border-b border-slate-200 dark:border-white/5 px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-blue-300/40">As Seen In</p>
          <Marquee pauseOnHover gap="3rem" duration="30s" className="[--marquee-gap:3rem]">
            <svg className="h-6 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 150 40" fill="currentColor">
              <text x="0" y="32" fontFamily="Georgia, serif" fontWeight="700" fontSize="36" letterSpacing="-1">Forbes</text>
            </svg>
            <svg className="h-5 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 200 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" letterSpacing="0">Cointelegraph</text>
            </svg>
            <svg className="h-5 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 150 30" fill="currentColor">
              <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5">BENZINGA</text>
            </svg>
            <svg className="h-5 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 160 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22">Bitcoin.com</text>
            </svg>
            <svg className="h-5 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 210 30" fill="currentColor">
              <text x="0" y="23" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="20" letterSpacing="0">GlobeNewswire</text>
            </svg>
            <svg className="h-5 flex-shrink-0 text-slate-500 dark:text-white/30 transition hover:text-slate-800 dark:hover:text-white/60" viewBox="0 0 180 30" fill="currentColor">
              <text x="0" y="23" fontFamily="monospace" fontWeight="700" fontSize="22">Hackernoon</text>
            </svg>
          </Marquee>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT ECOSYSTEM
      ═══════════════════════════════════════════════ */}
      <section className="relative z-10 bg-white px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-10 text-center">
            <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">Ecosystem</span>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.6rem]">One Platform. Five Revenue Streams.</h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">Everything you need to build, manage, and grow automated crypto wealth — all in one ecosystem.</p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'EX-AI Bot', desc: 'Automated crypto trading with 10.5%–16.6% monthly returns. Set it and let AI do the work.', stat: '~10.5–16.6% /mo', icon: '🤖', color: 'border-blue-200 bg-blue-50/50', iconBg: 'bg-blue-600' },
              { title: 'Zeus AI Bot',  desc: 'Next-gen trading engine designed for consistent, stable performance across market conditions.', stat: 'Advanced AI', icon: '⚡', color: 'border-violet-200 bg-violet-50/50', iconBg: 'bg-violet-600' },
              { title: 'NeoBank', desc: 'Seamless fiat-to-crypto banking with instant transactions. Manage your finances in one place.', stat: 'Instant transfers', icon: '🏦', color: 'border-cyan-200 bg-cyan-50/50', iconBg: 'bg-cyan-600' },
              { title: 'Crypto Card', desc: 'Spend your crypto earnings anywhere. Accepted at 80M+ merchants worldwide via Visa.', stat: 'Visa®', icon: '💳', color: 'border-emerald-200 bg-emerald-50/50', iconBg: 'bg-emerald-600' },
              { title: 'Exchange', desc: 'Buy, sell, and swap 200+ crypto pairs with ultra-low fees and institutional-grade security.', stat: '200+ pairs', icon: '📊', color: 'border-amber-200 bg-amber-50/50', iconBg: 'bg-amber-600' },
              { title: 'RWA Gold (XAU)', desc: 'Tokenized gold packages. Own real-world assets with 63–70% annual returns, Swiss vault delivery.', stat: '63–70% /yr', icon: '🥇', color: 'border-yellow-200 bg-yellow-50/50', iconBg: 'bg-yellow-600' },
            ].map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.08}
                className={`group relative rounded-2xl border ${p.color} p-0 transition-all hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1`}
              >
                <MagicCard className="rounded-2xl border-0 bg-transparent" gradientColor="#3b82f6" gradientOpacity={0.08}>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.iconBg} text-lg text-white shadow-md`}>
                        {p.icon}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500 mb-4">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{p.stat}</span>
                      <Link href="/products" className="text-xs font-semibold text-blue-600 opacity-0 transition group-hover:opacity-100">Learn More →</Link>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </div>

          {/* Calculator Teaser */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
            <Link href="/calculator" className="group block overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8 transition-all hover:shadow-xl hover:shadow-blue-100/50 hover:-translate-y-1">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-lg shadow-blue-600/30">
                  📈
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">See What Your Investment Could Become</h3>
                  <p className="mt-1 text-sm text-slate-500">Use our Profit Calculator to model your returns across all 8 tiers — with compound interest.</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition group-hover:bg-blue-700">
                    Open Calculator →
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PRODUCT SUITE
      ═══════════════════════════════════════════════ */}
      <section id="product-suite" className="relative overflow-hidden bg-white pb-0 pt-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="mb-3 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
              Product Suite
            </span>
            <h2 className="text-[2.2rem] font-bold tracking-tight text-slate-900 sm:text-[2.8rem]">
              Our Product Suite
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Four powerful products. One unified ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Dark section for cards */}
        <div className="relative mt-14 bg-[#061238] px-6 pb-20 pt-16 lg:px-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.2)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "BOTS", desc: "AI-powered trading bots that work 24/7 to grow your portfolio.", img: "/product-bots.png", icon: <BotIcon />, badge: "Most Popular", href: "/products#bots" },
              { title: "CRYPTO CARD", desc: "Spend digital assets anywhere with our next-gen crypto card.", img: "/product-card.png", icon: <CardIcon />, badge: null, href: "/products#cards" },
              { title: "EXCHANGE", desc: "Buy, sell and trade 200+ crypto pairs with ultra-low fees.", img: "/product-exchange.png", icon: <ExchangeIcon />, badge: null, href: "/products#exchange" },
              { title: "NEO BANK", desc: "Seamless fiat banking and crypto, fully integrated.", img: "/product-neobank.png", icon: <BankIcon />, badge: "Coming Soon", href: "/products#neobank" },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.15}
              >
                <ThreeDCard containerClassName="h-full">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                    <BorderBeam
                      size={180}
                      duration={10 + i}
                      delay={i * 0.5}
                      colorFrom="#60a5fa"
                      colorTo="#a78bfa"
                    />
                    <div className="relative h-44 overflow-hidden">
                      {card.badge && (
                        <div className="absolute right-3 top-3 z-10 rounded-full bg-blue-600 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-white shadow">
                          {card.badge}
                        </div>
                      )}
                      <Image
                        src={card.img}
                        alt={card.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-center p-5 text-center">
                      <div className="mb-2 flex items-center gap-2 text-blue-600">
                        {card.icon}
                        <h3 className="text-[1.05rem] font-bold tracking-tight text-slate-800">{card.title}</h3>
                      </div>
                      <p className="mb-5 flex-1 text-[0.78rem] leading-relaxed text-slate-500">{card.desc}</p>
                      <Link
                        href={card.href}
                        className="w-4/5 rounded-lg bg-[#3b82f6] py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_6px_16px_rgba(59,130,246,0.4)]"
                      >
                        Learn More →
                      </Link>
                    </div>
                  </article>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ACTION STEPS
      ═══════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative bg-gradient-to-b from-[#eef2fa] to-[#dce5f4] px-6 py-24 lg:px-10">
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="text-[1.8rem] font-extrabold uppercase tracking-tight text-slate-900 sm:text-[2.2rem]">
              <span className="text-blue-600">Action Steps:</span> Register Your AutopilotROI Account
            </h2>
            <p className="mt-3 text-slate-500">
              Follow these steps to unlock access to the onboarding system and begin your setup.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Steps grid */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { num: 1, title: 'Click "Get Started"', desc: "Press the button below to begin your free registration.", icon: <CursorIcon /> },
                { num: 2, title: "Create Your Free Account", desc: "Enter your details and create a secure account.", icon: <UserPlusIcon /> },
                { num: 3, title: "Verify & Log In", desc: "Check your email to verify, then log in to your account.", icon: <VerifyIcon /> },
                { num: 4, title: "Access Your Dashboard", desc: "Start your onboarding and unlock all your tools.", icon: <DashboardIcon /> },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i * 0.12}
                  className="flex flex-col rounded-2xl border border-white bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1d4ed8] text-sm font-bold text-white shadow-[0_4px_12px_rgba(29,78,216,0.4)]">
                      {step.num}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Step {step.num}</span>
                  </div>
                  <h3 className="mb-2 text-[0.95rem] font-bold text-slate-800">{step.title}</h3>
                  <p className="mb-4 flex-1 text-[0.78rem] leading-relaxed text-slate-500">{step.desc}</p>
                  <div className="text-blue-500">{step.icon}</div>
                </motion.div>
              ))}
            </div>

            {/* Device mockups */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={0.5}
              className="relative flex w-full items-end justify-center lg:w-[340px] lg:flex-shrink-0"
            >
              <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-full" />
              {/* Laptop */}
              <div className="relative z-10 w-[310px] overflow-hidden rounded-t-xl border-b-4 border-slate-300 bg-[#1e293b] px-2 pt-2 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex h-52 flex-col overflow-hidden rounded-t-sm bg-white">
                  <div className="flex h-4 items-center gap-1 border-b border-slate-100 bg-slate-50 px-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                    <div className="mx-auto text-[0.45rem] text-slate-400 font-medium">app.autopilotroi.com</div>
                  </div>
                  <div className="flex-1 p-3">
                    <div className="text-[0.5rem] font-bold uppercase tracking-wider text-slate-400">Dashboard</div>
                    <div className="mt-1 text-xl font-bold text-slate-800">$24,529.00</div>
                    <div className="mt-0.5 text-[0.55rem] font-semibold text-emerald-500">▲ +12.48% this month</div>
                    <svg viewBox="0 0 200 70" className="mt-2 h-16 w-full overflow-visible">
                      <defs>
                        <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 55 C30 45, 60 55, 90 38 S140 10, 180 8 L200 5 L200 70 L0 70 Z" fill="url(#laptopGrad)" />
                      <path d="M0 55 C30 45, 60 55, 90 38 S140 10, 180 8 L200 5" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Phone */}
              <div className="absolute -left-4 bottom-0 z-20 w-[105px] overflow-hidden rounded-2xl border-4 border-[#0f172a] bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.2)]">
                <div className="flex justify-center bg-white pb-1 pt-2">
                  <div className="h-1 w-8 rounded-full bg-slate-200" />
                </div>
                <div className="flex min-h-[140px] flex-col gap-2 bg-slate-50 px-2.5 pb-4 pt-2">
                  <div className="text-center text-[0.5rem] font-bold text-blue-600">🔵 AutopilotROI</div>
                  <div className="mt-1 text-[0.4rem] font-medium text-slate-500">Email</div>
                  <div className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 text-[0.4rem] text-slate-300">name@email.com</div>
                  <div className="text-[0.4rem] font-medium text-slate-500">Password</div>
                  <div className="flex h-5 items-center rounded border border-slate-200 bg-white px-1.5 text-[0.4rem] text-slate-300">••••••••</div>
                  <div className="mt-1 flex h-5 items-center justify-center rounded bg-blue-600 text-[0.45rem] font-bold text-white shadow">Login</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold text-slate-600">
            {["✓ Quick & Easy", "✓ Secure", "✓ Get Started in Minutes"].map((item) => (
              <span key={item} className="text-slate-600">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      {/* SOCIAL PROOF — Testimonials + Trust Badges */}
      {isEnabled('socialProof') && <SocialProof />}

      {/* ═══════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════ */}
      <section data-dark className="relative overflow-hidden bg-[#061238] px-6 py-24 text-center lg:px-10">
        <BackgroundBeams className="opacity-40" />
        <Spotlight className="-top-20 left-1/2 -translate-x-1/2" fill="#60a5fa" />
        {/* Magic UI Meteors — falling starfield */}
        <Meteors number={22} />
        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-[2rem] font-bold text-white sm:text-[2.6rem] tracking-tight">
              Ready to Take the Next Step?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-blue-100/70 leading-relaxed">
              Join thousands of members already building their financial future through the Aurum AI ecosystem — guided every step of the way.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShineBorder
                borderRadius={12}
                borderWidth={2}
                duration={10}
                color={["#60a5fa", "#a78bfa", "#818cf8"]}
                className="bg-transparent p-0"
              >
                <Link
                  href="/signup"
                  className="group relative block overflow-hidden rounded-[10px] bg-[#3b82f6] px-10 py-4 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.55)]"
                >
                  <span className="relative z-10">Get Started Free →</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
              </ShineBorder>
              <VideoModal videoUrl={VIDEO_URL} ctaLabel="Ready to Get Started? →" ctaHref="/signup">
                <button className="flex items-center gap-2 rounded-lg border border-blue-300/40 bg-white/5 px-8 py-4 text-[1.05rem] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                  Watch Demo
                </button>
              </VideoModal>
            </div>
          </motion.div>
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
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/></svg>;
}
function CardIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>;
}
function ExchangeIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>;
}
function BankIcon() {
  return <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M4 10v10h4V10zm6 0v10h4V10zm-8 12h20v-2H2v2zm14-12v10h4V10zM11.5 1L2 6v2h20V6z"/></svg>;
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
