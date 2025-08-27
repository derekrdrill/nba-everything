import NBABoxScoreShort from './NBABoxScore/NBABoxScoreShort';
import NBAGame from './NBAGame/NBAGame';
import NBAGameBoxScore from './NBAGameBoxScore/NBAGameBoxScore';
import NBAGameBoxScoreShort from './NBAGameBoxScore/NBAGameBoxScoreShort';
import NBAGameStat from './NBAGameStat/NBAGameStat';
import NBAGameStats from './NBAGameStats/NBAGameStats';
import NBAPlayerStat from './NBAPlayerStat/NBAPlayerStat';
import NBAStadium from './NBAStadium/NBAStadium';
import NBATeam from './NBATeam/NBATeam';
import NBATeamStats from './NBATeamStats/NBATeamStats';

type NBAPlayerStatValue = number | 'DNP';
type NBASelectedMode = 'dark' | 'light' | 'team';

export type {
  NBABoxScoreShort,
  NBAGame,
  NBAGameBoxScore,
  NBAGameBoxScoreShort,
  NBAGameStat,
  NBAGameStats,
  NBAPlayerStat,
  NBAPlayerStatValue,
  NBASelectedMode,
  NBAStadium,
  NBATeam,
  NBATeamStats,
};
