import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NBAGame, NBATeam } from '@types';

type NBAEverythingState = {
  selectedGame?: NBAGame;
  selectedSeason?: number;
  selectedTeam?: NBATeam;
  setSelectedGame: (game?: NBAGame) => void;
  setSelectedSeason: (season: number) => void;
  setSelectedTeam: (team: NBATeam) => void;
};

export const useNBAEverythingStore = create<NBAEverythingState>()(
  persist(
    (set, get) => ({
      selectedSeason: 2024,
      setSelectedGame: game => set({ selectedGame: game }),
      setSelectedTeam: team => set({ selectedTeam: team }),
      setSelectedSeason: season => set({ selectedSeason: season }),
    }),
    {
      name: 'nba-everything-session',
      partialize: state => ({
        selectedSeason: state.selectedSeason,
        selectedTeam: state.selectedTeam,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useNBAEverythingStore;
