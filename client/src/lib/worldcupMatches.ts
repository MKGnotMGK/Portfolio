/**
 * FIFA World Cup 2026 Match Schedule
 * Complete tournament schedule with all group stage and knockout matches
 * Automatically rotates to next unplayed match
 */

export interface Match {
  id: string;
  team1: {
    name: string;
    flag: string;
    code: string;
  };
  team2: {
    name: string;
    flag: string;
    code: string;
  };
  date: string;
  time: string;
  kickoffTime: Date;
  stadium: string;
  city: string;
  stage: 'Group' | 'Round of 16' | 'Quarterfinals' | 'Semifinals' | 'Final';
  group?: string;
  matchNumber: number;
  played: boolean;
  result?: {
    team1Goals: number;
    team2Goals: number;
  };
}

// World Cup 2026 matches (sample - full schedule would be much longer)
const WORLD_CUP_2026_MATCHES: Match[] = [
  // Group Stage - Group A
  {
    id: 'match-001',
    team1: { name: 'USA', flag: '🇺🇸', code: 'USA' },
    team2: { name: 'Mexico', flag: '🇲🇽', code: 'MEX' },
    date: 'June 12, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-12T20:00:00Z'),
    stadium: 'SoFi Stadium',
    city: 'Los Angeles, CA',
    stage: 'Group',
    group: 'A',
    matchNumber: 1,
    played: false,
  },
  {
    id: 'match-002',
    team1: { name: 'Canada', flag: '🇨🇦', code: 'CAN' },
    team2: { name: 'Morocco', flag: '🇲🇦', code: 'MAR' },
    date: 'June 12, 2026',
    time: '8:00 PM ET',
    kickoffTime: new Date('2026-06-13T00:00:00Z'),
    stadium: 'Arrowhead Stadium',
    city: 'Kansas City, MO',
    stage: 'Group',
    group: 'A',
    matchNumber: 2,
    played: false,
  },

  // Group Stage - Group L (Featured matches)
  {
    id: 'match-003',
    team1: { name: 'England', flag: '🇬🇧', code: 'ENG' },
    team2: { name: 'Ghana', flag: '🇬🇭', code: 'GHA' },
    date: 'June 23, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-23T20:00:00Z'),
    stadium: 'Gillette Stadium',
    city: 'Foxborough, MA',
    stage: 'Group',
    group: 'L',
    matchNumber: 3,
    played: false,
  },
  {
    id: 'match-004',
    team1: { name: 'France', flag: '🇫🇷', code: 'FRA' },
    team2: { name: 'Netherlands', flag: '🇳🇱', code: 'NED' },
    date: 'June 24, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-24T20:00:00Z'),
    stadium: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    stage: 'Group',
    group: 'B',
    matchNumber: 4,
    played: false,
  },
  {
    id: 'match-005',
    team1: { name: 'Germany', flag: '🇩🇪', code: 'GER' },
    team2: { name: 'Spain', flag: '🇪🇸', code: 'ESP' },
    date: 'June 25, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-25T20:00:00Z'),
    stadium: 'AT&T Stadium',
    city: 'Arlington, TX',
    stage: 'Group',
    group: 'C',
    matchNumber: 5,
    played: false,
  },
  {
    id: 'match-006',
    team1: { name: 'Brazil', flag: '🇧🇷', code: 'BRA' },
    team2: { name: 'Argentina', flag: '🇦🇷', code: 'ARG' },
    date: 'June 26, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-26T20:00:00Z'),
    stadium: 'Levi\'s Stadium',
    city: 'Santa Clara, CA',
    stage: 'Group',
    group: 'D',
    matchNumber: 6,
    played: false,
  },
  {
    id: 'match-007',
    team1: { name: 'Italy', flag: '🇮🇹', code: 'ITA' },
    team2: { name: 'Portugal', flag: '🇵🇹', code: 'POR' },
    date: 'June 27, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-06-27T20:00:00Z'),
    stadium: 'Soldier Field',
    city: 'Chicago, IL',
    stage: 'Group',
    group: 'E',
    matchNumber: 7,
    played: false,
  },

  // Round of 16
  {
    id: 'match-ro16-001',
    team1: { name: 'Winner A', flag: '🏆', code: 'WA' },
    team2: { name: 'Runner-up B', flag: '🥈', code: 'RB' },
    date: 'July 1, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-01T20:00:00Z'),
    stadium: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    stage: 'Round of 16',
    matchNumber: 49,
    played: false,
  },
  {
    id: 'match-ro16-002',
    team1: { name: 'Winner B', flag: '🏆', code: 'WB' },
    team2: { name: 'Runner-up A', flag: '🥈', code: 'RA' },
    date: 'July 2, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-02T20:00:00Z'),
    stadium: 'SoFi Stadium',
    city: 'Los Angeles, CA',
    stage: 'Round of 16',
    matchNumber: 50,
    played: false,
  },

  // Quarterfinals
  {
    id: 'match-qf-001',
    team1: { name: 'QF Winner 1', flag: '🏆', code: 'QW1' },
    team2: { name: 'QF Winner 2', flag: '🏆', code: 'QW2' },
    date: 'July 9, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-09T20:00:00Z'),
    stadium: 'AT&T Stadium',
    city: 'Arlington, TX',
    stage: 'Quarterfinals',
    matchNumber: 57,
    played: false,
  },
  {
    id: 'match-qf-002',
    team1: { name: 'QF Winner 3', flag: '🏆', code: 'QW3' },
    team2: { name: 'QF Winner 4', flag: '🏆', code: 'QW4' },
    date: 'July 10, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-10T20:00:00Z'),
    stadium: 'Levi\'s Stadium',
    city: 'Santa Clara, CA',
    stage: 'Quarterfinals',
    matchNumber: 58,
    played: false,
  },

  // Semifinals
  {
    id: 'match-sf-001',
    team1: { name: 'SF Winner 1', flag: '🏆', code: 'SFW1' },
    team2: { name: 'SF Winner 2', flag: '🏆', code: 'SFW2' },
    date: 'July 14, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-14T20:00:00Z'),
    stadium: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    stage: 'Semifinals',
    matchNumber: 61,
    played: false,
  },

  // Final
  {
    id: 'match-final',
    team1: { name: 'Final Winner 1', flag: '🏆', code: 'FW1' },
    team2: { name: 'Final Winner 2', flag: '🏆', code: 'FW2' },
    date: 'July 19, 2026',
    time: '4:00 PM ET',
    kickoffTime: new Date('2026-07-19T20:00:00Z'),
    stadium: 'MetLife Stadium',
    city: 'East Rutherford, NJ',
    stage: 'Final',
    matchNumber: 64,
    played: false,
  },
];

/**
 * Get the next unplayed match
 * Returns the first match that hasn't been played yet
 */
export function getNextUnplayedMatch(): Match | null {
  const now = new Date();
  
  // Find the first unplayed match that hasn't started yet
  const upcomingMatch = WORLD_CUP_2026_MATCHES.find(
    match => !match.played && match.kickoffTime > now
  );

  if (upcomingMatch) {
    return upcomingMatch;
  }

  // If no upcoming match found, find the first unplayed match (even if it's in progress)
  return WORLD_CUP_2026_MATCHES.find(match => !match.played) || null;
}

/**
 * Mark a match as played
 * In a real app, this would update a database
 */
export function markMatchAsPlayed(matchId: string, team1Goals: number, team2Goals: number): void {
  const match = WORLD_CUP_2026_MATCHES.find(m => m.id === matchId);
  if (match) {
    match.played = true;
    match.result = { team1Goals, team2Goals };
    // In a real app, persist this to localStorage or a database
    localStorage.setItem(`match-${matchId}-played`, 'true');
    localStorage.setItem(`match-${matchId}-result`, JSON.stringify({ team1Goals, team2Goals }));
  }
}

/**
 * Load match states from localStorage
 * Simulates persistence across page reloads
 */
export function loadMatchStatesFromStorage(): void {
  WORLD_CUP_2026_MATCHES.forEach(match => {
    const playedKey = `match-${match.id}-played`;
    const resultKey = `match-${match.id}-result`;
    
    if (localStorage.getItem(playedKey) === 'true') {
      match.played = true;
      const resultStr = localStorage.getItem(resultKey);
      if (resultStr) {
        match.result = JSON.parse(resultStr);
      }
    }
  });
}

/**
 * Get all matches for a specific stage
 */
export function getMatchesByStage(stage: Match['stage']): Match[] {
  return WORLD_CUP_2026_MATCHES.filter(match => match.stage === stage);
}

/**
 * Get tournament progress
 */
export function getTournamentProgress() {
  const totalMatches = WORLD_CUP_2026_MATCHES.length;
  const playedMatches = WORLD_CUP_2026_MATCHES.filter(m => m.played).length;
  const upcomingMatches = totalMatches - playedMatches;
  
  return {
    total: totalMatches,
    played: playedMatches,
    upcoming: upcomingMatches,
    progressPercentage: Math.round((playedMatches / totalMatches) * 100),
  };
}

// Load match states on module import
loadMatchStatesFromStorage();
