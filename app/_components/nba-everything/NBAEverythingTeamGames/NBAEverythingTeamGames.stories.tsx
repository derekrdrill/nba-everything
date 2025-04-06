import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingTeamGames from './NBAEverythingTeamGames';
import { mockTeamLAL, mockTeamStats } from '@/mocks';

const meta: Meta<typeof NBAEverythingTeamGames> = {
  title: 'Components/NBAEverything/TeamGames',
  component: NBAEverythingTeamGames,
};

export default meta;
type Story = StoryObj<typeof NBAEverythingTeamGames>;

export const Default: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingAtoms: {
      selectedMode: 'light',
      selectedTeam: mockTeamLAL,
      selectedSeason: 2023,
    },
  },
};
