import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingSeasonAverages from './NBAEverythingSeasonAverages';
import { mockTeamCLT, mockTeamStats } from '@/mocks';

const meta: Meta<typeof NBAEverythingSeasonAverages> = {
  title: 'Components/NBAEverything/SeasonAverages',
  component: NBAEverythingSeasonAverages,
};

export default meta;
type Story = StoryObj<typeof NBAEverythingSeasonAverages>;

export const LightMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingAtoms: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
      selectedSeason: 2023,
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingAtoms: {
      selectedMode: 'dark',
      selectedTeam: mockTeamCLT,
      selectedSeason: 2023,
    },
  },
};

export const TeamMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingAtoms: {
      selectedMode: 'team',
      selectedTeam: mockTeamCLT,
      selectedSeason: 2023,
    },
  },
};
