import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Trophy, Lock, AlertCircle } from 'lucide-react';
import { Countdown } from '@/components/Countdown';
import { Confetti } from '@/components/Confetti';
import { getNextUnplayedMatch, getTournamentProgress, type Match } from '@/lib/worldcupMatches';

/**
 * World Cup Match Predictor - Home Page
 * - Automatically displays the next unplayed match
 * - Rotates to next match after current match is played
 * - Tracks tournament progress throughout the World Cup period
 * - Tactical Board Design System with premium aesthetics
 */

interface Prediction {
  type: 'win' | 'draw' | 'loss';
  label: string;
  description: string;
}

const PREDICTIONS: Prediction[] = [
  {
    type: 'win',
    label: 'Team 1 Win',
    description: 'First team takes the match',
  },
  {
    type: 'draw',
    label: 'Draw',
    description: 'Both teams share the points',
  },
  {
    type: 'loss',
    label: 'Team 2 Win',
    description: 'Second team takes the match',
  },
];

export default function Home() {
  const [, navigate] = useLocation();
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tournamentProgress, setTournamentProgress] = useState({ total: 0, played: 0, upcoming: 0, progressPercentage: 0 });
  const [tournamentEnded, setTournamentEnded] = useState(false);

  // Load initial match and set up auto-refresh
  useEffect(() => {
    const loadCurrentMatch = () => {
      const nextMatch = getNextUnplayedMatch();
      setCurrentMatch(nextMatch);
      setTournamentProgress(getTournamentProgress());
      
      if (!nextMatch) {
        setTournamentEnded(true);
      }
    };

    loadCurrentMatch();

    // Check for match updates every 30 seconds
    // In a real app, this would be a WebSocket or polling from a backend
    const interval = setInterval(loadCurrentMatch, 30000);

    return () => clearInterval(interval);
  }, []);

  // Reset prediction when match changes
  useEffect(() => {
    setSelectedPrediction(null);
    setShowConfirmation(false);
  }, [currentMatch?.id]);

  const handlePredictionClick = (predictionType: string) => {
    setSelectedPrediction(predictionType);
    setShowConfirmation(true);
    setTriggerConfetti(true);
    setTimeout(() => setTriggerConfetti(false), 100);
  };

  const handleLockInPrediction = () => {
    if (!selectedPrediction || !currentMatch) return;

    // Trigger fade-out animation
    setIsTransitioning(true);

    // Navigate after animation completes
    setTimeout(() => {
      navigate(`/confirmation?prediction=${selectedPrediction}&matchId=${currentMatch.id}`);
    }, 500);
  };

  if (tournamentEnded) {
    return (
      <div className="min-h-screen bg-background tactical-grid relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-screen">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12 max-w-2xl text-center">
            <Trophy className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Tournament Complete!
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              The FIFA World Cup 2026 has concluded. Thank you for making predictions throughout the tournament!
            </p>
            <Button
              onClick={() => navigate('/about')}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              View Portfolio
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentMatch) {
    return (
      <div className="min-h-screen bg-background tactical-grid relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-screen">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12 max-w-2xl text-center">
            <AlertCircle className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Loading Next Match
            </h1>
            <p className="text-muted-foreground text-lg">
              Please wait while we fetch the next featured match...
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-background tactical-grid relative overflow-hidden transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Confetti Animation */}
      <Confetti trigger={triggerConfetti} duration={2500} />

      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Tournament Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Tournament Progress</span>
            <span>{tournamentProgress.played} of {tournamentProgress.total} matches</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${tournamentProgress.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-12">
          <Countdown targetDate={currentMatch.kickoffTime} />
        </div>

        {/* Match Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12">
            {/* Competition Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              {currentMatch.stage === 'Group' 
                ? `FIFA World Cup 2026 - Group ${currentMatch.group}` 
                : `FIFA World Cup 2026 - ${currentMatch.stage}`}
            </div>

            {/* Teams Section */}
            <div className="flex items-center justify-between mb-12 gap-8">
              {/* Team 1 */}
              <div className="flex-1 text-center">
                <div className="text-6xl mb-4">{currentMatch.team1.flag}</div>
                <h2 className="font-display text-3xl text-foreground mb-2">
                  {currentMatch.team1.name}
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
                <div className="text-6xl mb-4">{currentMatch.team2.flag}</div>
                <h2 className="font-display text-3xl text-foreground mb-2">
                  {currentMatch.team2.name}
                </h2>
              </div>
            </div>

            {/* Match Details */}
            <div className="space-y-3 pt-8 border-t border-border/30">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="text-foreground font-medium">{currentMatch.date}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="text-foreground font-medium">{currentMatch.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Stadium</span>
                <span className="text-foreground font-medium text-right">
                  {currentMatch.stadium}, {currentMatch.city}
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
                    ? 'bg-accent text-accent-foreground shadow-lg prediction-button-selected'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
                variant={selectedPrediction === 'win' ? 'default' : 'outline'}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <span>{currentMatch.team1.name} Win</span>
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
                    ? 'bg-accent text-accent-foreground shadow-lg prediction-button-selected'
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
                    ? 'bg-accent text-accent-foreground shadow-lg prediction-button-selected'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
                variant={selectedPrediction === 'loss' ? 'default' : 'outline'}
              >
                <div className="flex items-center justify-between w-full px-4">
                  <span>{currentMatch.team2.name} Win</span>
                  {selectedPrediction === 'loss' && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Confirmation Message */}
          {showConfirmation && selectedPrediction && (
            <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/30 text-center confirmation-message">
              <p className="text-accent font-medium mb-4">
                ✓ Prediction Selected: {
                  selectedPrediction === 'win' ? `${currentMatch.team1.name} Win` :
                  selectedPrediction === 'draw' ? 'Draw' :
                  `${currentMatch.team2.name} Win`
                }
              </p>
              <Button
                onClick={handleLockInPrediction}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                <Lock className="w-4 h-4" />
                Lock In Prediction
              </Button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-muted-foreground text-sm">
          <p>Match #{currentMatch.matchNumber} of the FIFA World Cup 2026</p>
          <p className="mt-2 text-xs opacity-70">This page automatically updates to show the next unplayed match</p>
        </div>
      </div>
    </div>
  );
}
