import { NBAGameBoxScore, NBAGameBoxScoreShort, NBAGameStat } from '@types';

type NBAGameStats = {
  abbrName: string;
  boxScoreData: NBAGameBoxScore[];
  boxScoreDataShort: NBAGameBoxScoreShort[];
  fullName: string;
  logo: string;
  locale: string;
  score: number;
  statLeaders: NBAGameStat[];
};

export default NBAGameStats;
