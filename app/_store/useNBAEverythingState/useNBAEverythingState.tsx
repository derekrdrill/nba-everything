import { useAtom } from 'jotai/react';
import {
  selectedGameAtom,
  selectedModeAtom,
  selectedSeasonAtom,
  selectedTeamStatsAtom,
  selectedTeamAtom,
} from '../nbaEverythingAtoms/nbaEverythingAtoms';

const useNBAEverythingState = () => {
  const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);
  const [selectedMode, setSelectedMode] = useAtom(selectedModeAtom);
  const [selectedSeason, setSelectedSeason] = useAtom(selectedSeasonAtom);
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

export { useNBAEverythingState };
