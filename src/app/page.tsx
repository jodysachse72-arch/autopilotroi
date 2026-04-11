"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import VideoModal from "@/components/ui/VideoModal";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/spotlight";
import { WobbleCard } from "@/components/ui/wobble-card";
import { ThreeDCard } from "@/components/ui/three-d-card";

const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

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
  return (
    <div className="overflow-hidden bg-white text-slate-900 font-sans">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#061238] text-white min-h-[580px]">
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
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              AI-Powered Finance Platform
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-[2.8rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.8rem]"
            >
              A Smarter Entry Point
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-white bg-clip-text text-transparent">
                Into AI-Driven Finance
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
              <VideoModal videoUrl={VIDEO_URL}>
                <button
                  id="hero-watch-overview"
                  className="group relative overflow-hidden rounded-lg bg-[#3b82f6] px-8 py-3.5 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(59,130,246,0.55)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                    Watch Overview
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>
              </VideoModal>

              <Link
                href="#how-it-works"
                className="flex items-center gap-2 text-[1rem] font-medium text-blue-200 transition hover:text-white"
              >
                How It Works
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-10 flex items-center gap-6 text-xs text-blue-300/60 font-medium"
            >
              {["No Credit Card Required", "Free to Get Started", "Trusted by 10,000+ Users"].map((t) => (
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

              {/* App content */}
              <div className="flex bg-white" style={{ height: 310 }}>
                {/* Sidebar */}
                <div className="hidden w-[130px] flex-shrink-0 bg-[#081b54] py-3 text-white sm:flex flex-col gap-0.5">
                  <div className="mb-2 px-4 text-[0.45rem] uppercase tracking-widest text-blue-300/50 font-bold">Navigation</div>
                  {[
                    { label: "Dashboard", icon: "⊞", active: true },
                    { label: "Bots", icon: "◍" },
                    { label: "Exchange", icon: "⇄" },
                    { label: "Crypto Card", icon: "▣" },
                    { label: "Neo Bank", icon: "⊚" },
                    { label: "Holdings", icon: "◈" },
                    { label: "Settings", icon: "⚙" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`mx-2 flex items-center gap-1.5 rounded px-2 py-1.5 text-[0.55rem] font-medium transition-colors ${
                        item.active
                          ? "bg-blue-600/80 text-white"
                          : "text-blue-200/50 hover:bg-blue-700/30 hover:text-blue-100"
                      }`}
                    >
                      <span className="w-3 text-center">{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Main dashboard */}
                <div className="relative flex-1 overflow-hidden p-4 bg-[#f8fafc]">
                  {/* Stats row */}
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="text-[0.5rem] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Portfolio Value</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-800">$24,529.00</span>
                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[0.6rem] font-bold text-emerald-600">+12.48%</span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="rounded bg-blue-600 px-2.5 py-1 text-[0.55rem] font-bold text-white">Deposit</button>
                      <button className="rounded border border-slate-200 px-2.5 py-1 text-[0.55rem] font-bold text-slate-600 bg-white">Withdraw</button>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="relative rounded-lg border border-slate-100 bg-white overflow-hidden" style={{ height: 180 }}>
                    <svg viewBox="0 0 400 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                      {[40, 80, 120].map((y) => (
                        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                      ))}
                      <defs>
                        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 130 C50 115, 90 90, 130 100 S200 60, 250 65 S310 30, 360 25 L400 15 L400 160 L0 160 Z" fill="url(#areaGrad)" />
                      <path d="M0 130 C50 115, 90 90, 130 100 S200 60, 250 65 S310 30, 360 25 L400 15" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                      {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((x, i) => {
                        const isGreen = i % 3 !== 0;
                        const color = isGreen ? "#22c55e" : "#ef4444";
                        const h = 90 - Math.sin(i * 0.7) * 35;
                        return (
                          <g key={x}>
                            <line x1={x} x2={x} y1={h - 8} y2={h + 12} stroke={color} strokeWidth="0.8" />
                            <rect x={x - 2} y={h} width="5" height="10" fill={color} rx="0.5" />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Video play button overlay */}
                    <VideoModal videoUrl={VIDEO_URL}>
                      <button className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e12a2b] shadow-[0_8px_24px_rgba(225,42,43,0.5)] transition-all hover:scale-110 hover:shadow-[0_12px_32px_rgba(225,42,43,0.65)]">
                        <svg viewBox="0 0 24 24" className="h-6 w-6 ml-0.5 fill-white">
                          <path d="M8 5.14v14l11-7-11-7z" />
                        </svg>
                      </button>
                    </VideoModal>
                  </div>

                  {/* Video bar */}
                  <div className="mt-0.5 flex h-5 items-center justify-between rounded bg-[#080d1e] px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.55rem] text-white">▶</span>
                      <span className="text-[0.5rem] text-white/70">0:00 / 3:46</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-0.5 w-24 rounded-full bg-white/20">
                        <div className="h-full w-0 rounded-full bg-blue-400" />
                      </div>
                      <span className="text-[0.5rem] text-white/70">HD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURE STRIP
      ═══════════════════════════════════════════════ */}
      <section className="relative z-10 -mt-6 bg-white px-6 pb-6 pt-12 lg:px-10 rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(6,18,56,0.15)]">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            {
              title: "AI Automation",
              desc: "Automated trading strategies that work 24/7, driven by advanced AI algorithms.",
              icon: <BotFeatureIcon />,
              color: "from-blue-50 to-indigo-50",
              iconBg: "bg-blue-600",
            },
            {
              title: "Digital Banking",
              desc: "Full control of your funds with modern neo-banking features built for crypto natives.",
              icon: <CardFeatureIcon />,
              color: "from-violet-50 to-purple-50",
              iconBg: "bg-violet-600",
            },
            {
              title: "Crypto Infrastructure",
              desc: "Exchange, hold, and spend digital assets seamlessly from a single unified dashboard.",
              icon: <GlobeFeatureIcon />,
              color: "from-cyan-50 to-blue-50",
              iconBg: "bg-cyan-600",
            },
          ].map((f, i) => (
            <WobbleCard
              key={f.title}
              containerClassName={`bg-gradient-to-br ${f.color} border border-slate-100 shadow-[0_4px_20px_rgba(30,50,110,0.05)]`}
            >
              <motion.article
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.2}
                className="flex items-start gap-4 p-6"
              >
                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${f.iconBg} text-white shadow-lg`}>
                  {f.icon}
                </div>
                <div>
                  <h2 className="mb-1 text-[1.05rem] font-bold text-slate-900">{f.title}</h2>
                  <p className="text-[0.8rem] leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </motion.article>
            </WobbleCard>
          ))}
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
              { title: "BOTS", desc: "AI-powered trading bots that work 24/7 to grow your portfolio.", img: "/product-bots.png", icon: <BotIcon />, badge: "Most Popular" },
              { title: "CRYPTO CARD", desc: "Spend digital assets anywhere with our next-gen crypto card.", img: "/product-card.png", icon: <CardIcon />, badge: null },
              { title: "EXCHANGE", desc: "Buy, sell and trade 200+ crypto pairs with ultra-low fees.", img: "/product-exchange.png", icon: <ExchangeIcon />, badge: null },
              { title: "NEO BANK", desc: "Seamless fiat banking and crypto, fully integrated.", img: "/product-neobank.png", icon: <BankIcon />, badge: "Coming Soon" },
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
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-shadow hover:shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
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
                        href="/summary"
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
      <section id="how-it-works" className="relative bg-[#f4f7fc] px-6 py-24 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
              Get Started
            </span>
            <h2 className="text-[2rem] font-bold tracking-tight text-slate-900 sm:text-[2.4rem]">
              Register Your AutopilotROI Account
            </h2>
            <p className="mt-3 text-slate-500">
              Four simple steps to unlock your AI-powered financial dashboard.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            {/* Steps */}
            <div className="flex flex-1 flex-col sm:flex-row rounded-[1.5rem] border border-white bg-white/70 p-2 shadow-[0_20px_40px_rgba(15,23,42,0.05)] backdrop-blur-md">
              {[
                { num: 1, title: 'Click "Get Started"', desc: "Press the button below to begin your free registration.", icon: <CursorIcon /> },
                { num: 2, title: "Create Free Account", desc: "Enter your details and create a secure account in seconds.", icon: <UserPlusIcon /> },
                { num: 3, title: "Verify & Log In", desc: "Check your email, verify your account, then log in.", icon: <VerifyIcon /> },
                { num: 4, title: "Access Dashboard", desc: "Start your onboarding and unlock all your tools.", icon: <DashboardIcon /> },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i * 0.15}
                  className="flex-1 border-b border-slate-100 p-5 last:border-0 sm:border-b-0 sm:border-r"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1d4ed8] text-xs font-bold text-white shadow">
                      {step.num}
                    </span>
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Step {step.num}</span>
                  </div>
                  <h3 className="mb-1.5 text-sm font-bold text-slate-800">{step.title}</h3>
                  <p className="text-[0.72rem] leading-relaxed text-slate-500">{step.desc}</p>
                  <div className="mt-4 text-blue-500">{step.icon}</div>
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
              className="relative flex w-full items-end justify-center lg:w-[320px] lg:flex-shrink-0"
            >
              <div className="absolute inset-0 bg-blue-400/10 blur-3xl rounded-full" />
              {/* Laptop */}
              <div className="relative z-10 w-[300px] overflow-hidden rounded-t-xl border-b-4 border-slate-300 bg-[#1e293b] px-2 pt-2 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
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
              <div className="absolute -left-4 bottom-0 z-20 w-[100px] overflow-hidden rounded-2xl border-4 border-[#0f172a] bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.2)]">
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
            {["✓ Quick & Easy", "✓ Bank-Grade Security", "✓ Get Started in Minutes"].map((item) => (
              <span key={item} className="text-slate-600">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#061238] px-6 py-24 text-center lg:px-10">
        <BackgroundBeams className="opacity-40" />
        <Spotlight className="-top-20 left-1/2 -translate-x-1/2" fill="#60a5fa" />
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
              <Link
                href="/start"
                className="group relative overflow-hidden rounded-lg bg-[#3b82f6] px-10 py-4 text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_rgba(59,130,246,0.4)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.55)]"
              >
                <span className="relative z-10">Get Started Free →</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </Link>
              <VideoModal videoUrl={VIDEO_URL}>
                <button className="flex items-center gap-2 rounded-lg border border-blue-300/40 bg-white/5 px-8 py-4 text-[1.05rem] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z" /></svg>
                  Watch Demo
                </button>
              </VideoModal>
            </div>
          </motion.div>
        </div>
      </section>
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
