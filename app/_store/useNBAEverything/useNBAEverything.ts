import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { createJSONStorage, persist } from 'zustand/middleware';
import { NBAGame, NBATeam, NBATeamStats, NBASelectedMode } from '@/app/_types';

type NBAEverythingState = {
  selectedGame?: NBAGame;
  selectedMode: NBASelectedMode;
  selectedSeason: number;
  selectedTeam?: NBATeam;
  selectedTeamStats?: number;
  currentTeamSeasonData?: NBATeamStats;
  nextCursor?: number;
  setSelectedGame: (game?: NBAGame) => void;
  setSelectedSeason: (season: number) => void;
  setSelectedMode: (selectedMode: NBASelectedMode) => void;
  setSelectedTeam: (team: NBATeam) => void;
  setSelectedTeamStats: (team?: number) => void;
  setCurrentTeamSeasonData: (data: NBATeamStats) => void;
  appendCurrentTeamSeasonData: (data: NBATeamStats) => void;
  setNextCursor: (cursor: number | undefined) => void;
};

const useNBAEverythingStore = create<NBAEverythingState>()(
  persist(
    set => ({
      selectedMode: 'light',
      selectedSeason: 2024,
      selectedTeamStats: 0,
      setSelectedGame: game => set({ selectedGame: game }),
      setSelectedMode: selectedMode => set({ selectedMode }),
      setSelectedTeam: team => set({ selectedTeam: team }),
      setSelectedSeason: season => set({ selectedSeason: season }),
      setSelectedTeamStats: team => set({ selectedTeamStats: team }),
      setCurrentTeamSeasonData: data => set({ currentTeamSeasonData: data }),
      appendCurrentTeamSeasonData: data =>
        set(state => ({
          currentTeamSeasonData: state.currentTeamSeasonData
            ? {
                ...state.currentTeamSeasonData,
                gameData: [...state.currentTeamSeasonData.gameData, ...data.gameData],
              }
            : data,
        })),
      setNextCursor: cursor => set({ nextCursor: cursor }),
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
