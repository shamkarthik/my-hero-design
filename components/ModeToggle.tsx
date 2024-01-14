"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAudioPlayer } from "./useAudioPlayer";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { play } = useAudioPlayer();
  const setDarkMode = () => {
    setTheme("dark");
    play("/static/im-batman.mp3");
  };
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-inherit"
        onClick={() => (theme === "dark" ? setTheme("light") : setDarkMode())}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {/* <span className="sr-only">Toggle theme</span> */}
      </Button>
    </>
  );
}
