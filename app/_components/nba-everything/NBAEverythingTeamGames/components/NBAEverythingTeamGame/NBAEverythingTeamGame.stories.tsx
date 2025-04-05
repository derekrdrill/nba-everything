import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingTeamGame from './NBAEverythingTeamGame';
import { mockSeasonGameData, mockTeamCLT } from '@/mocks';

const meta: Meta<typeof NBAEverythingTeamGame> = {
  title: 'Components/NBAEverything/TeamGames/TeamGame',
  component: NBAEverythingTeamGame,
};

export default meta;
type Story = StoryObj<typeof NBAEverythingTeamGame>;

const defaultStyle = {
  width: '200px',
  height: '150px',
};

export const HomeWin: Story = {
  args: {
    columnIndex: 0,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockSeasonGameData,
    },
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
      selectedSeason: '2023-24',
    },
  },
};

export const HomeLoss: Story = {
  args: {
    columnIndex: 3,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockSeasonGameData,
    },
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
      selectedSeason: '2023-24',
    },
  },
};

export const VisitorWin: Story = {
  args: {
    columnIndex: 2,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockSeasonGameData,
    },
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
      selectedSeason: '2023-24',
    },
  },
};

export const VisitorLoss: Story = {
  args: {
    columnIndex: 1,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockSeasonGameData,
    },
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
      selectedSeason: '2023-24',
    },
  },
};
