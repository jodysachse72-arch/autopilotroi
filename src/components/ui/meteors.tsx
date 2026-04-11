"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Meteors
 * Absolutely-positioned falling meteor streaks for hero/CTA backgrounds.
 * Parent must be `relative overflow-hidden`.
 * Required keyframe `meteor` lives in globals.css.
 */
export function Meteors({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Math.random + window must run client-side only. Defer the setState
    // via rAF so we don't trip React 19's "set-state synchronously in effect"
    // lint rule — the update lands on the next frame.
    const generated: React.CSSProperties[] = Array.from(
      { length: number },
      () => ({
        top: -5,
        left: Math.floor(Math.random() * window.innerWidth) + "px",
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      })
    );
    const id = requestAnimationFrame(() => setStyles(generated));
    return () => cancelAnimationFrame(id);
  }, [number]);

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-200 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className
          )}
          style={style}
        />
      ))}
    </>
  );
}
