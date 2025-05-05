import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NBAGame, NBATeam, NBASelectedMode } from '@/app/_types';

type NBAEverythingState = {
  selectedGame?: NBAGame;
  selectedMode: NBASelectedMode;
  selectedSeason: number;
  selectedTeam?: NBATeam;
  selectedTeamStats: number;
  setSelectedGame: (selectedGame?: NBAGame) => void;
  setSelectedMode: (selectedMode: NBASelectedMode) => void;
  setSelectedSeason: (selectedSeason: number) => void;
  setSelectedTeam: (selectedTeam: NBATeam) => void;
  setSelectedTeamStats: (selectedTeamStats: number) => void;
};

const useNBAEverythingStore = create<NBAEverythingState>()(
  persist(
    set => ({
      selectedMode: 'light',
      selectedSeason: 2024,
      selectedTeamStats: 0,
      setSelectedGame: selectedGame => set({ selectedGame }),
      setSelectedMode: selectedMode => set({ selectedMode }),
      setSelectedTeam: selectedTeam => set({ selectedTeam }),
      setSelectedSeason: selectedSeason => set({ selectedSeason }),
      setSelectedTeamStats: selectedTeamStats => set({ selectedTeamStats }),
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

const useShallowNBAEverythingStore = <T>(selector: (state: NBAEverythingState) => T) =>
  useNBAEverythingStore(useShallow(selector));

export default useShallowNBAEverythingStore;
export { useNBAEverythingStore };
