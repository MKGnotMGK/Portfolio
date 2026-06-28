/**
 * Predictions Storage Utility
 * Manages local storage for user predictions and accuracy tracking
 */

export interface StoredPrediction {
  id: string;
  matchId: string;
  team1Name: string;
  team2Name: string;
  team1Flag: string;
  team2Flag: string;
  prediction: 'win' | 'draw' | 'loss';
  predictionLabel: string;
  timestamp: number;
  date: string;
  stage: string;
  played: boolean;
  result?: {
    team1Goals: number;
    team2Goals: number;
  };
  correct?: boolean;
}

const STORAGE_KEY = 'worldcup-predictions';

/**
 * Save a prediction to local storage
 */
export function savePrediction(
  matchId: string,
  team1Name: string,
  team2Name: string,
  team1Flag: string,
  team2Flag: string,
  prediction: 'win' | 'draw' | 'loss',
  stage: string
): StoredPrediction {
  const predictions = getAllPredictions();
  
  // Check if prediction for this match already exists
  const existingIndex = predictions.findIndex(p => p.matchId === matchId);
  
  const predictionLabel = 
    prediction === 'win' ? `${team1Name} Win` :
    prediction === 'draw' ? 'Draw' :
    `${team2Name} Win`;

  const newPrediction: StoredPrediction = {
    id: `${matchId}-${Date.now()}`,
    matchId,
    team1Name,
    team2Name,
    team1Flag,
    team2Flag,
    prediction,
    predictionLabel,
    timestamp: Date.now(),
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    stage,
    played: false,
  };

  if (existingIndex >= 0) {
    // Replace existing prediction
    predictions[existingIndex] = newPrediction;
  } else {
    // Add new prediction
    predictions.push(newPrediction);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
  return newPrediction;
}

/**
 * Get all stored predictions
 */
export function getAllPredictions(): StoredPrediction[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * Get predictions for a specific match
 */
export function getPredictionForMatch(matchId: string): StoredPrediction | undefined {
  const predictions = getAllPredictions();
  return predictions.find(p => p.matchId === matchId);
}

/**
 * Update prediction with match result
 */
export function updatePredictionResult(
  matchId: string,
  team1Goals: number,
  team2Goals: number
): StoredPrediction | null {
  const predictions = getAllPredictions();
  const prediction = predictions.find(p => p.matchId === matchId);

  if (!prediction) return null;

  // Determine match result
  let matchResult: 'win' | 'draw' | 'loss';
  if (team1Goals > team2Goals) {
    matchResult = 'win';
  } else if (team1Goals < team2Goals) {
    matchResult = 'loss';
  } else {
    matchResult = 'draw';
  }

  // Check if prediction was correct
  const correct = prediction.prediction === matchResult;

  prediction.result = { team1Goals, team2Goals };
  prediction.played = true;
  prediction.correct = correct;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
  return prediction;
}

/**
 * Get accuracy statistics
 */
export function getAccuracyStats() {
  const predictions = getAllPredictions();
  const playedPredictions = predictions.filter(p => p.played);
  const correctPredictions = playedPredictions.filter(p => p.correct);

  return {
    total: predictions.length,
    played: playedPredictions.length,
    correct: correctPredictions.length,
    accuracy: playedPredictions.length > 0 
      ? Math.round((correctPredictions.length / playedPredictions.length) * 100)
      : 0,
    pending: predictions.length - playedPredictions.length,
  };
}

/**
 * Get predictions by stage
 */
export function getPredictionsByStage(stage: string): StoredPrediction[] {
  const predictions = getAllPredictions();
  return predictions.filter(p => p.stage === stage);
}

/**
 * Clear all predictions
 */
export function clearAllPredictions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export predictions as JSON
 */
export function exportPredictions(): string {
  const predictions = getAllPredictions();
  return JSON.stringify(predictions, null, 2);
}

/**
 * Get predictions sorted by date (newest first)
 */
export function getPredictionsSorted(): StoredPrediction[] {
  const predictions = getAllPredictions();
  return predictions.sort((a, b) => b.timestamp - a.timestamp);
}
