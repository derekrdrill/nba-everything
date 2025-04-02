import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NBAGame, NBATeam } from '@/types';

type NBAEverythingState = {
  selectedGame?: NBAGame;
  selectedMode: 'dark' | 'light' | 'team';
  selectedSeason: number;
  selectedTeam?: NBATeam;
  selectedTeamStats: number;
  setSelectedGame: (game?: NBAGame) => void;
  setSelectedMode: (mode: 'dark' | 'light' | 'team') => void;
  setSelectedSeason: (season: number) => void;
  setSelectedTeam: (team: NBATeam) => void;
  setSelectedTeamStats: (team?: number) => void;
};

export const useNBAEverythingStore = create<NBAEverythingState>()(
  persist(
    (set, get) => ({
      selectedMode: 'light',
      selectedSeason: 2024,
      selectedTeamStats: 0,
      setSelectedGame: game => set({ selectedGame: game }),
      setSelectedMode: mode => set({ selectedMode: mode }),
      setSelectedTeam: team => set({ selectedTeam: team }),
      setSelectedSeason: season => set({ selectedSeason: season }),
      setSelectedTeamStats: team => set({ selectedTeamStats: team }),
    }),
    {
      name: 'nba-everything-session',
      partialize: state => ({
        selectedMode: state.selectedMode,
        selectedSeason: state.selectedSeason,
        selectedTeam: state.selectedTeam,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useNBAEverythingStore;
