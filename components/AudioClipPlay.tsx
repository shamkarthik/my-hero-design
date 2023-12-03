import { useRef } from "react";

export default function AudioClipPlay({ audioPath }: { audioPath: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      // Handle the case where audioRef.current is null
    }
  };

  return (
    <div>
      <button onClick={play}>Play</button>
      <audio ref={audioRef} src={audioPath} />
    </div>
  );
}
