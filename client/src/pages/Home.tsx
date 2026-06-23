import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Trophy } from 'lucide-react';
import { Countdown } from '@/components/Countdown';

/**
 * Tactical Board Design System
 * - Dark premium aesthetic with strategic gold accents
 * - Large match card with team information
 * - Asymmetric prediction button layout
 * - Smooth interactions with hover and click feedback
 */

interface Prediction {
  type: 'win' | 'draw' | 'loss';
  label: string;
  description: string;
}

const NEXT_MATCH = {
  team1: {
    name: 'England',
    flag: '🇬🇧',
    color: 'oklch(0.35 0.15 260)', // England blue
  },
  team2: {
    name: 'Ghana',
    flag: '🇬🇭',
    color: 'oklch(0.5 0.2 30)', // Ghana gold/red
  },
  date: 'June 23, 2026',
  time: '4:00 PM ET',
  kickoffTime: new Date('2026-06-23T20:00:00Z'), // 4:00 PM ET = 8:00 PM UTC
  stadium: 'Gillette Stadium, Foxborough, MA',
  competition: 'FIFA World Cup 2026 - Group L',
};

const PREDICTIONS: Prediction[] = [
  {
    type: 'win',
    label: 'England Win',
    description: 'England takes the match',
  },
  {
    type: 'draw',
    label: 'Draw',
    description: 'Both teams share the points',
  },
  {
    type: 'loss',
    label: 'Ghana Win',
    description: 'Ghana takes the match',
  },
];

export default function Home() {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePredictionClick = (predictionType: string) => {
    setSelectedPrediction(predictionType);
    setShowConfirmation(true);
    // Auto-hide confirmation after 2 seconds
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background tactical-grid relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 mb-4">
            <Trophy className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-2">
            World Cup Match Predictor
          </h1>
          <p className="text-muted-foreground text-lg">
            Make your prediction for the next featured match
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-12">
          <Countdown targetDate={NEXT_MATCH.kickoffTime} />
        </div>

        {/* Match Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12">
            {/* Competition Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              {NEXT_MATCH.competition}
            </div>

            {/* Teams Section */}
            <div className="flex items-center justify-between mb-12 gap-8">
              {/* Team 1 */}
              <div className="flex-1 text-center">
                <div className="text-6xl mb-4">{NEXT_MATCH.team1.flag}</div>
                <h2 className="font-display text-3xl text-foreground mb-2">
                  {NEXT_MATCH.team1.name}
                </h2>
              </div>

              {/* VS Divider */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-1 h-12 bg-border/30" />
                <span className="text-muted-foreground font-medium text-sm">VS</span>
                <div className="w-1 h-12 bg-border/30" />
              </div>

              {/* Team 2 */}
              <div className="flex-1 text-center">
                <div className="text-6xl mb-4">{NEXT_MATCH.team2.flag}</div>
                <h2 className="font-display text-3xl text-foreground mb-2">
                  {NEXT_MATCH.team2.name}
                </h2>
              </div>
            </div>

            {/* Match Details */}
            <div className="space-y-3 pt-8 border-t border-border/30">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground font-medium">{NEXT_MATCH.date}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground font-medium">{NEXT_MATCH.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Stadium</span>
                <span className="text-foreground font-medium text-right">
                  {NEXT_MATCH.stadium}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Prediction Section */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-display text-2xl text-foreground mb-8 text-center">
            Make Your Prediction
          </h3>

          {/* Prediction Buttons - Asymmetric Layout */}
          <div className="space-y-4">
            {/* First button - full width */}
            <div>
              <Button
                onClick={() => handlePredictionClick('win')}
                className={`prediction-button-base w-full h-16 font-display text-lg transition-all ${
                  selectedPrediction === 'win'
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
                variant={selectedPrediction === 'win' ? 'default' : 'outline'}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <span>{PREDICTIONS[0].label}</span>
                  {selectedPrediction === 'win' && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
              </Button>
            </div>

            {/* Second and third buttons - side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handlePredictionClick('draw')}
                className={`prediction-button-base h-16 font-display text-lg transition-all ${
                  selectedPrediction === 'draw'
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
                variant={selectedPrediction === 'draw' ? 'default' : 'outline'}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <span>{PREDICTIONS[1].label}</span>
                  {selectedPrediction === 'draw' && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
              </Button>

              <Button
                onClick={() => handlePredictionClick('loss')}
                className={`prediction-button-base h-16 font-display text-lg transition-all ${
                  selectedPrediction === 'loss'
                    ? 'bg-accent text-accent-foreground shadow-lg'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
                variant={selectedPrediction === 'loss' ? 'default' : 'outline'}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <span>{PREDICTIONS[2].label}</span>
                  {selectedPrediction === 'loss' && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Confirmation Message */}
          {showConfirmation && selectedPrediction && (
            <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/30 text-center animate-in fade-in duration-200">
              <p className="text-accent font-medium">
                ✓ Prediction Locked In: {PREDICTIONS.find(p => p.type === selectedPrediction)?.label}
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>This is the next featured unplayed match in the FIFA World Cup 2026</p>
          <p className="mt-2 text-xs opacity-70">Countdown updates every second</p>
        </div>
      </div>
    </div>
  );
}
