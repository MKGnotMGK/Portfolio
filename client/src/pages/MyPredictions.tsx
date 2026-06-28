import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, XCircle, Clock, TrendingUp, Download, Trash2 } from 'lucide-react';
import { 
  getAllPredictions, 
  getAccuracyStats, 
  getPredictionsSorted,
  clearAllPredictions,
  exportPredictions,
  type StoredPrediction 
} from '@/lib/predictionsStorage';

/**
 * My Predictions Page
 * Displays all user predictions with accuracy tracking and statistics
 */

export default function MyPredictions() {
  const [, navigate] = useLocation();
  const [predictions, setPredictions] = useState<StoredPrediction[]>([]);
  const [stats, setStats] = useState({ total: 0, played: 0, correct: 0, accuracy: 0, pending: 0 });
  const [filterStage, setFilterStage] = useState<string>('All');
  const [filteredPredictions, setFilteredPredictions] = useState<StoredPrediction[]>([]);

  useEffect(() => {
    const allPredictions = getPredictionsSorted();
    setPredictions(allPredictions);
    setStats(getAccuracyStats());
  }, []);

  useEffect(() => {
    if (filterStage === 'All') {
      setFilteredPredictions(predictions);
    } else {
      setFilteredPredictions(predictions.filter(p => p.stage === filterStage));
    }
  }, [predictions, filterStage]);

  const stages = ['All', ...Array.from(new Set(predictions.map(p => p.stage)))];


  const handleExport = () => {
    const data = exportPredictions();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `worldcup-predictions-${new Date().toISOString().split('T')[0]}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all predictions? This cannot be undone.')) {
      clearAllPredictions();
      setPredictions([]);
      setStats({ total: 0, played: 0, correct: 0, accuracy: 0, pending: 0 });
    }
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
        {/* Back button */}
        <div className="mb-12">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Predictions
          </Button>
        </div>

        {/* Header */}
        <div className="max-w-5xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-6xl text-foreground mb-4">
            My Predictions
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your World Cup predictions and see how accurate you are throughout the tournament.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Total Predictions */}
            <Card className="match-card-shadow bg-card border border-border/50 p-6 text-center">
              <div className="text-3xl font-display text-accent mb-2">{stats.total}</div>
              <p className="text-muted-foreground text-sm">Total Predictions</p>
            </Card>

            {/* Pending */}
            <Card className="match-card-shadow bg-card border border-border/50 p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-display text-accent mb-2">{stats.pending}</div>
              <p className="text-muted-foreground text-sm">Pending</p>
            </Card>

            {/* Played */}
            <Card className="match-card-shadow bg-card border border-border/50 p-6 text-center">
              <div className="text-3xl font-display text-accent mb-2">{stats.played}</div>
              <p className="text-muted-foreground text-sm">Played</p>
            </Card>

            {/* Correct */}
            <Card className="match-card-shadow bg-card border border-border/50 p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-display text-accent mb-2">{stats.correct}</div>
              <p className="text-muted-foreground text-sm">Correct</p>
            </Card>

            {/* Accuracy */}
            <Card className="match-card-shadow bg-card border border-border/50 p-6 text-center bg-gradient-to-br from-accent/10 to-transparent">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-display text-accent mb-2">{stats.accuracy}%</div>
              <p className="text-muted-foreground text-sm">Accuracy</p>
            </Card>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Stage Filter */}
            <div className="flex gap-2 flex-wrap">
              {stages.map(stage => (
                <Button
                  key={stage}
                  onClick={() => setFilterStage(stage)}
                  variant={filterStage === stage ? 'default' : 'outline'}
                  size="sm"
                  className={filterStage === stage ? 'bg-accent text-accent-foreground' : ''}
                >
                  {stage}
                </Button>
              ))}
            </div>

            {/* Export and Clear */}
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                size="sm"
                className="gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Predictions List */}
        <div className="max-w-5xl mx-auto">
          {filteredPredictions.length === 0 ? (
            <Card className="match-card-shadow bg-card border border-border/50 p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                {predictions.length === 0 
                  ? 'No predictions yet. Start by making a prediction on the home page!'
                  : 'No predictions in this stage.'}
              </p>
              {predictions.length === 0 && (
                <Button
                  onClick={() => navigate('/')}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Make Your First Prediction
                </Button>
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredPredictions.map((prediction) => (
                <Card
                  key={prediction.id}
                  className={`project-card match-card-shadow bg-card border border-border/50 p-6 md:p-8 transition-all ${
                    prediction.correct ? 'border-accent/50' : prediction.played ? 'border-destructive/50' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl">{prediction.team1Flag}</span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="text-2xl">{prediction.team2Flag}</span>
                      </div>
                      <h3 className="font-display text-xl text-foreground mb-2">
                        {prediction.team1Name} vs {prediction.team2Name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>{prediction.stage}</span>
                        <span>{prediction.date}</span>
                      </div>
                    </div>

                    {/* Prediction and Result */}
                    <div className="flex flex-col md:flex-row gap-6 md:items-center">
                      {/* Prediction */}
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">Your Prediction</p>
                        <p className="font-display text-lg text-accent">
                          {prediction.predictionLabel}
                        </p>
                      </div>

                      {/* Result */}
                      {prediction.played && prediction.result && (
                        <>
                          <div className="hidden md:block w-px h-12 bg-border/30" />
                          <div className="text-center">
                            <p className="text-muted-foreground text-sm mb-2">Result</p>
                            <p className="font-display text-lg text-foreground">
                              {prediction.result.team1Goals} - {prediction.result.team2Goals}
                            </p>
                          </div>

                          <div className="hidden md:block w-px h-12 bg-border/30" />

                          {/* Status */}
                          <div className="flex items-center gap-2">
                            {prediction.correct ? (
                              <>
                                <CheckCircle2 className="w-6 h-6 text-accent" />
                                <span className="font-medium text-accent">Correct!</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-6 h-6 text-destructive" />
                                <span className="font-medium text-destructive">Incorrect</span>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      {!prediction.played && (
                        <>
                          <div className="hidden md:block w-px h-12 bg-border/30" />
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <span className="text-muted-foreground text-sm">Pending</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground text-sm">
          <p>© 2026 World Cup Match Predictor. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
