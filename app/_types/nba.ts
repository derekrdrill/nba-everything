export interface NBATeamStats {
  wins: number;
  losses: number;
  ppg: number;
  rpg: number;
  apg: number;
  spg: number;
  bpg: number;
  gameData: any[];
  pagination?: {
    nextCursor?: string;
  };
}
