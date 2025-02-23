import { NBAGame, NBATeam } from '@types';

type NBAGameBoxScore = {
  id: number;
  min: number;
  fgm: number;
  fga: number;
  fg_pct: string;
  fg3m: number;
  fg3a: number;
  fg3_pct: string;
  ftm: number;
  fta: number;
  ft_pct: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  player: string;
  team: NBATeam;
  game: NBAGame;
};

export default NBAGameBoxScore;
