import type { Meta, StoryObj } from '@storybook/react';

import NBASeasonAverage from './NBAEverythingSeasonAverage';
import { mockTeamCLT } from '@/mocks';
import '@/app/_styles/globals.css';

const meta: Meta<typeof NBASeasonAverage> = {
  title: 'Components/NBAEverything/SeasonAverage',
  component: NBASeasonAverage,
};

export default meta;
type Story = StoryObj<typeof NBASeasonAverage>;

export const LightMode: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const DarkMode: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'dark',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const TeamMode: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'team',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const WinLoss: Story = {
  args: {
    statTitle: 'W-L',
    statValue: '55-27',
  },
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
    },
  },
};
