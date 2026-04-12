"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — Marquee
 * Infinite auto-scrolling container. Duplicates children for seamless loop.
 * Pure CSS animation — no JS.
 */
export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  gap = "1rem",
  duration = "40s",
}: {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  gap?: string;
  duration?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:var(--marquee-gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-duration": duration,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--marquee-gap)]",
            vertical ? "flex-col animate-marquee-vertical" : "animate-marquee",
            reverse && (vertical ? "[animation-direction:reverse]" : "[animation-direction:reverse]"),
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
