"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — AnimatedShinyText
 * A light-glare sweep across text, creating a "premium shimmer" effect.
 * Pure CSS animation — no JS state needed.
 */
export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={cn(
        "inline-flex items-center justify-center",
        // base text
        "text-neutral-400/70",
        // shimmer gradient overlay
        "[background:linear-gradient(110deg,transparent,45%,rgba(255,255,255,0.5),55%,transparent)_var(--shimmer-width)_0_/_200%_100%_no-repeat]",
        // clip to text
        "bg-clip-text",
        // animate
        "animate-shiny-text",
        className
      )}
    >
      {children}
    </span>
  );
}
