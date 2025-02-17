import { NBATeam } from '@types';

export type NBAGame = {
  id: number;
  date: string;
  datetime: string;
  home_team_score: number;
  home_team: NBATeam;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: NBATeam;
  visitor_team_score: number;
  win: boolean;
};
