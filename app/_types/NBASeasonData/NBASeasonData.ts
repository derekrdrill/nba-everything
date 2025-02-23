import { NBATeam } from '@types';

type NBASeasonData = {
  apg: number;
  bpg: number;
  gameData: {
    id: number;
    date: string;
    season: number;
    status: string;
    period: number;
    time: string;
    postseason: boolean;
    home_team_score: number;
    visitor_team_score: number;
    datetime: string;
    home_team: NBATeam;
    visitor_team: NBATeam;
    win: true;
  }[];
  losses: number;
  ppg: number;
  rpg: number;
  spg: number;
  wins: number;
};

export type { NBASeasonData };
