"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function WobbleCard({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015, rotate: -0.5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-2xl",
        containerClassName
      )}
    >
      <div className={cn("relative z-10", className)}>{children}</div>
    </motion.div>
  );
}
