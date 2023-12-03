import { useRef } from "react";

interface UseAudioPlayerProps {
  src: string;
}

export const useAudioPlayer = ({ src }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return { play, audioRef, src };
};
