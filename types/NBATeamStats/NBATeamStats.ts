import { NBAGame } from '@types';

export type NBATeamStats = {
  apg: number;
  bpg: number;
  gameData: NBAGame[];
  losses: number;
  ppg: number;
  rpg: number;
  spg: number;
  wins: number;
};
