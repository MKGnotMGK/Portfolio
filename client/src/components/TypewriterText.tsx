import { useEffect, useState } from 'react';

/**
 * Typewriter Text Component
 * Animates text character by character with typewriter effect
 * Returns a callback to detect when animation is complete
 */

interface TypewriterTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  speed?: number; // milliseconds per character
}

export function TypewriterText({
  text,
  className = '',
  onComplete,
  speed = 50,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };

    // Start typing after a small delay
    timeoutId = setTimeout(typeNextCharacter, 100);

    return () => clearTimeout(timeoutId);
  }, [text, speed, onComplete]);

  return (
    <div className={className}>
      <span className="inline-block whitespace-pre-wrap break-words">
        {displayedText}
      </span>
      {!isComplete && (
        <span className="inline-block w-0.5 h-[1.2em] ml-1 bg-accent animate-pulse" />
      )}
    </div>
  );
}
