import { useEffect } from "react";

interface TextToSpeechOptions {
  voice?: string;
}

export const useTextToSpeech = ({
  voice = "UK English Male",
}: TextToSpeechOptions = {}) => {
  useEffect(() => {
    return () => {
      // Clean up: cancel any ongoing speech when the component is unmounted
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
      // Find the desired voice based on the provided voice name
      const selectedVoice = voices.find((v) => v.name === voice);
      utterance.voice = selectedVoice || voices[0]; // Use the first available voice if not found
    }

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  return { speak };
};
