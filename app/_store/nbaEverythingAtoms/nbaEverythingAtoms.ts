import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { NBAGame, NBATeam, NBASelectedMode } from '@/types';

const gameStorage = createJSONStorage<NBAGame | undefined>(() => sessionStorage);
const modeStorage = createJSONStorage<NBASelectedMode | undefined>(() => sessionStorage);
const seasonStorage = createJSONStorage<number | undefined>(() => sessionStorage);
const teamStatsStorage = createJSONStorage<number | undefined>(() => sessionStorage);
const teamStorage = createJSONStorage<NBATeam | undefined>(() => sessionStorage);

const selectedGameAtom = atomWithStorage<NBAGame | undefined>(
  'selectedGame',
  undefined,
  gameStorage,
);
const selectedModeAtom = atomWithStorage<NBASelectedMode | undefined>(
  'selectedMode',
  undefined,
  modeStorage,
);
const selectedSeasonAtom = atomWithStorage<number | undefined>(
  'selectedSeason',
  undefined,
  seasonStorage,
);
const selectedTeamAtom = atomWithStorage<NBATeam | undefined>(
  'selectedTeam',
  undefined,
  teamStorage,
);
const selectedTeamStatsAtom = atomWithStorage<number | undefined>(
  'selectedTeamStats',
  undefined,
  teamStatsStorage,
);

export {
  selectedGameAtom,
  selectedModeAtom,
  selectedSeasonAtom,
  selectedTeamStatsAtom,
  selectedTeamAtom,
};
