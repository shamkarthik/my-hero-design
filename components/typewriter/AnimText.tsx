"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import CursorBlinker from "./CursorBlinker";

export interface IAnimTextProps {
  delay: number;
  textClass?: string;
  text: string;
  cursorHeight: string;
}

export default function AnimText({
  delay,
  text = "",
  cursorHeight,
}: IAnimTextProps) {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text?.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      },
    });
    return controls.stop;
  }, []);

  return (
    <span className="">
      <motion.span>{displayText}</motion.span>
      {!done && displayText && <CursorBlinker height={cursorHeight} />}
    </span>
  );
}
