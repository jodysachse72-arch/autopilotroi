"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI — ShineBorder
 * Rotating conic-gradient border wrapper. Drop it around any content and
 * a shimmering colored line orbits the container edge.
 * Required keyframe `shine` lives in globals.css.
 */
export interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

export function ShineBorder({
  borderRadius = 16,
  borderWidth = 1,
  duration = 14,
  color = ["#60a5fa", "#818cf8", "#a78bfa"],
  className,
  children,
}: ShineBorderProps) {
  const colorStops = Array.isArray(color) ? color.join(",") : color;

  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--mask-linear-gradient":
            "linear-gradient(#0000, #0000), linear-gradient(#000, #000)",
          "--background-radial-gradient": `radial-gradient(transparent,transparent, ${colorStops},transparent,transparent)`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid min-h-[60px] w-full place-items-center rounded-[--border-radius] bg-white p-[--border-width] text-slate-900",
        "before:bg-[length:300%_300%] before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[mask:--mask-linear-gradient] before:animate-shine",
        className
      )}
    >
      {children}
    </div>
  );
}
