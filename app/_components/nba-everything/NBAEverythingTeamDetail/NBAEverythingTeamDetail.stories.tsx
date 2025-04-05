import type { Meta, StoryObj } from '@storybook/react';

import NBAEverythingTeamDetail from '@/components/nba-everything/NBAEverythingTeamDetail/NBAEverythingTeamDetail';
import { mockTeamCLT } from '@/mocks';

const meta: Meta<typeof NBAEverythingTeamDetail> = {
  title: 'Components/NBAEverything/TeamDetail',
  component: NBAEverythingTeamDetail,
};

export default meta;
type Story = StoryObj<typeof NBAEverythingTeamDetail>;

export const LightMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'dark',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const TeamMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'team',
      selectedTeam: mockTeamCLT,
    },
  },
};

export const Loading: Story = {
  parameters: {
    isLoading: true,
    useNBAEverythingState: {
      selectedMode: 'light',
      selectedTeam: mockTeamCLT,
    },
  },
};
