import { useEffect, useState } from 'react';

/**
 * Animated Text Component
 * Animates text word by word with staggered entrance effect
 */

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = text.split(' ');
    let currentIndex = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setDisplayedWords((prev) => [...prev, words[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100); // Stagger interval between words

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <div className={className}>
      {displayedWords.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'both',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
