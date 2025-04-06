import { useAtom } from 'jotai/react';
import {
  selectedGameAtom,
  selectedModeAtom,
  selectedSeasonAtom,
  selectedTeamStatsAtom,
  selectedTeamAtom,
} from '@/store/nbaEverythingAtoms/nbaEverythingAtoms';
import { NBA_SEASONS } from '@/app/_components/nba-everything/NBAEverythingSeasonSearch/constants';

const useNBAEverythingAtoms = () => {
  const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
  const [selectedMode, setSelectedMode] = useAtom(selectedModeAtom);
  const [selectedSeason, setSelectedSeason] = useAtom(selectedSeasonAtom || NBA_SEASONS[0].year);
  const [selectedTeamStats, setSelectedTeamStats] = useAtom(selectedTeamStatsAtom);
  const [selectedTeam, setSelectedTeam] = useAtom(selectedTeamAtom);

  return {
    selectedGame,
    selectedMode,
    selectedSeason,
    selectedTeamStats,
    selectedTeam,
    setSelectedGame,
    setSelectedMode,
    setSelectedSeason,
    setSelectedTeamStats,
    setSelectedTeam,
  };
};

export { useNBAEverythingAtoms };
