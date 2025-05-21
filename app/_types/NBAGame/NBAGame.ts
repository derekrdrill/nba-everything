import { NBATeam } from '@/types';

type NBAGame = {
  id: number;
  date: string;
  datetime: string;
  home_team_score: number;
  home_team?: NBATeam;
  home_team_id?: NBATeam;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team?: NBATeam;
  visitor_team_id?: NBATeam;
  visitor_team_score: number;
  win?: boolean;
  pagination: {
    perPage: number;
    totalGames: number;
    nextCursor: number;
  };
};

export default NBAGame;
