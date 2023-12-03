import { useEffect, useRef } from "react";

interface AudioPlayer {
  play: (src?: string) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const useAudioPlayer = (): AudioPlayer => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const audio = document.createElement("audio");

      // Set default attributes and append to body if not present
      if (!audio.parentElement) {
        audio.src = ""; // Set an empty source initially
        document.body.appendChild(audio);
      }

      // Assign the created audio element to the ref
      audioRef.current = audio;

      // Clean up on unmount
      return () => {
        const parent = audio?.parentElement;
        if (parent && parent.contains(audio)) {
          parent.removeChild(audio);
        }
      };
    }
  }, []);

  const play = (src?: string) => {
    const audio = audioRef.current;

    if (src) {
      // Update the audio source only if a new source is provided
      audio?.setAttribute("src", src);

      // Use the canplay event to ensure that the play method is called when the new source is ready
      audio?.addEventListener(
        "canplay",
        () => {
          audio.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        },
        { once: true }
      );
    } else {
      // If no new source is provided, just play the current audio
      audio?.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return { play, audioRef };
};
