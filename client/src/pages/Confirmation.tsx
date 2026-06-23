import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Trophy, ArrowLeft } from 'lucide-react';

/**
 * Confirmation Page
 * Displays after user locks in their prediction
 * Shows match details and prediction summary
 */

interface PredictionData {
  type: 'win' | 'draw' | 'loss';
  label: string;
  teamName?: string;
}

const PREDICTION_DETAILS: Record<string, PredictionData> = {
  win: {
    type: 'win',
    label: 'England Win',
    teamName: 'England',
  },
  draw: {
    type: 'draw',
    label: 'Draw',
  },
  loss: {
    type: 'loss',
    label: 'Ghana Win',
    teamName: 'Ghana',
  },
};

export default function Confirmation() {
  const [, navigate] = useLocation();

  // Get prediction from URL params
  const params = new URLSearchParams(window.location.search);
  const predictionType = params.get('prediction') as keyof typeof PREDICTION_DETAILS;
  const prediction = PREDICTION_DETAILS[predictionType];

  if (!prediction) {
    return (
      <div className="min-h-screen bg-background tactical-grid flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-foreground mb-4">Invalid prediction. Please go back and try again.</p>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background tactical-grid relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Back button */}
        <div className="mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Prediction
          </Button>
        </div>

        {/* Confirmation Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="match-card-shadow bg-card border border-border/50 p-8 md:p-12 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6 mx-auto">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              Prediction Locked In!
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg mb-8">
              Your prediction has been successfully recorded
            </p>

            {/* Prediction Summary */}
            <div className="bg-secondary/50 border border-border/50 rounded-lg p-6 md:p-8 mb-8">
              <p className="text-muted-foreground text-sm mb-2">Your Prediction</p>
              <h2 className="font-display text-3xl md:text-4xl text-accent mb-4">
                {prediction.label}
              </h2>

              {prediction.teamName && (
                <p className="text-foreground text-lg">
                  You predicted <span className="font-semibold">{prediction.teamName}</span> will win
                </p>
              )}
              {prediction.type === 'draw' && (
                <p className="text-foreground text-lg">
                  You predicted the match will end in a <span className="font-semibold">draw</span>
                </p>
              )}
            </div>

            {/* Match Details */}
            <div className="space-y-3 mb-8 text-left">
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Match</span>
                <span className="text-foreground font-medium">England vs Ghana</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="text-foreground font-medium">June 23, 2026 at 4:00 PM ET</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                <span className="text-muted-foreground">Stadium</span>
                <span className="text-foreground font-medium">Gillette Stadium, Foxborough, MA</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="flex-1"
              >
                Make Another Prediction
              </Button>
              <Button
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Trophy className="w-4 h-4 mr-2" />
                View Leaderboard
              </Button>
            </div>

            {/* Footer note */}
            <p className="text-muted-foreground text-sm mt-8">
              Your prediction will be compared with the actual match result on June 23, 2026
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
