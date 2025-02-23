import { NBAGame } from '@types';

type NBATeamStats = {
  apg: number;
  bpg: number;
  gameData: NBAGame[];
  losses: number;
  ppg: number;
  rpg: number;
  spg: number;
  wins: number;
};

export default NBATeamStats;
