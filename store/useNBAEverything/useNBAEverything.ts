import { create } from 'zustand';
import { NBAGame, NBATeam } from '@types';

type NBAEverythingState = {
  selectedGame?: NBAGame;
  selectedSeason?: number;
  selectedTeam?: NBATeam;
  setSelectedGame: (game?: NBAGame) => void;
  setSelectedSeason: (season: number) => void;
  setSelectedTeam: (team: NBATeam) => void;
};

const useNBAEverythingStore = create<NBAEverythingState>(set => ({
  selectedSeason: 2024,
  setSelectedGame: game => set({ selectedGame: game }),
  setSelectedTeam: team => set({ selectedTeam: team }),
  setSelectedSeason: season => set({ selectedSeason: season }),
}));

export default useNBAEverythingStore;
