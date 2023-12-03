// components/KeywordListener.tsx
import { useEffect, useState } from "react";

interface KeywordListenerProps {
  targetWord: string;
  onKeywordTyped: () => void;
}

const KeywordListener: React.FC<KeywordListenerProps> = ({
  targetWord,
  onKeywordTyped,
}) => {
  const [typedWord, setTypedWord] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      // Only consider alphanumeric characters
      if (/^[a-zA-Z0-9]$/.test(key)) {
        const newTypedWord = typedWord + key.toLowerCase();
        console.log(newTypedWord);
        if (newTypedWord.includes(targetWord)) {
          setTypedWord("");
          onKeywordTyped();
        } else if (newTypedWord.length > targetWord.length) {
          setTypedWord(key.toLowerCase());
        } else {
          setTypedWord(newTypedWord);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedWord, targetWord, onKeywordTyped]);

  return null;
};

export default KeywordListener;
