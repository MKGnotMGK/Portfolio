import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

/**
 * Countdown Timer Component
 * Displays live days, hours, minutes, and seconds until a target date
 * Updates every second with smooth animations
 */

interface CountdownProps {
  targetDate: Date;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setIsExpired(false);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
          <Clock className="w-5 h-5 text-destructive" />
          <span className="text-destructive font-medium">Match in progress</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 mb-4">
        <Clock className="w-5 h-5 text-accent animate-pulse" />
        <span className="text-accent font-medium text-sm">Kickoff Countdown</span>
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {/* Days */}
        <div className="flex flex-col items-center">
          <div className="bg-secondary/50 border border-border/50 rounded-lg p-3 md:p-4 w-full">
            <div className="font-display text-2xl md:text-3xl text-accent">
              {String(timeRemaining.days).padStart(2, '0')}
            </div>
          </div>
          <span className="text-muted-foreground text-xs md:text-sm mt-2 font-medium">Days</span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <div className="bg-secondary/50 border border-border/50 rounded-lg p-3 md:p-4 w-full">
            <div className="font-display text-2xl md:text-3xl text-accent">
              {String(timeRemaining.hours).padStart(2, '0')}
            </div>
          </div>
          <span className="text-muted-foreground text-xs md:text-sm mt-2 font-medium">Hours</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <div className="bg-secondary/50 border border-border/50 rounded-lg p-3 md:p-4 w-full">
            <div className="font-display text-2xl md:text-3xl text-accent">
              {String(timeRemaining.minutes).padStart(2, '0')}
            </div>
          </div>
          <span className="text-muted-foreground text-xs md:text-sm mt-2 font-medium">Minutes</span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <div className="bg-secondary/50 border border-border/50 rounded-lg p-3 md:p-4 w-full">
            <div className="font-display text-2xl md:text-3xl text-accent">
              {String(timeRemaining.seconds).padStart(2, '0')}
            </div>
          </div>
          <span className="text-muted-foreground text-xs md:text-sm mt-2 font-medium">Seconds</span>
        </div>
      </div>
    </div>
  );
}
