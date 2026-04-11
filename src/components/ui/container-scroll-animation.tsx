"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

/**
 * Aceternity UI — ContainerScroll
 * Scroll-driven 3D tilt that brings a dashboard mockup forward as the
 * viewer scrolls. Wraps any child and reveals it with a perspective rotation.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scaleDimensions: [number, number] = isMobile ? [0.75, 0.92] : [1.05, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[56rem] items-center justify-center p-2 md:h-[72rem] md:p-16"
    >
      <div
        className="relative w-full py-10 md:py-28"
        style={{ perspective: "1200px" }}
      >
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl px-4 text-center"
    >
      {children}
    </motion.div>
  );
};

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="relative mx-auto -mt-10 h-[28rem] w-full max-w-5xl rounded-[28px] border-4 border-[#6C6C6C] bg-[#1a1f36] p-2 shadow-2xl md:h-[38rem] md:p-5"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-slate-50 md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
