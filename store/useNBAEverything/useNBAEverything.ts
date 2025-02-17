import { create } from 'zustand';
import { NBATeam } from '@types';

type NBAEverythingState = {
  selectedSeason?: number;
  selectedTeam?: NBATeam;
  setSelectedSeason: (season: number) => void;
  setSelectedTeam: (team: NBATeam) => void;
};

const useNBAEverythingStore = create<NBAEverythingState>(set => ({
  setSelectedTeam: team => set({ selectedTeam: team }),
  setSelectedSeason: season => set({ selectedSeason: season }),
}));

export default useNBAEverythingStore;
