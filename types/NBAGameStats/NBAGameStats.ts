import { NBAGameBoxScore, NBAGameBoxScoreShort, NBAGameStat } from '@types';

type NBAGameStats = {
  abbrName: string;
  boxScoreData: NBAGameBoxScore[];
  boxScoreDataShort: NBAGameBoxScoreShort[];
  fullName: 'Chicago Bulls';
  locale: 'home';
  score: 136;
  statLeaders: NBAGameStat[];
};

export default NBAGameStats;
