import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingGameStatLeaders from '@/app/game/[gameId]/components/NBAEverythingGameStatLeaders/NBAEverythingGameStatLeaders';
import { mockSelectedGame } from '../../../../../mocks';

const meta: Meta<typeof NBAEverythingGameStatLeaders> = {
  title: 'Components/NBAEverything/Game/StatLeaders',
  component: NBAEverythingGameStatLeaders,
};

export default meta;
type Story = StoryObj<typeof NBAEverythingGameStatLeaders>;

export const HomeTeamSelected: Story = {
  parameters: {
    useNBAEverythingAtoms: {
      selectedMode: 'light',
      selectedTeamStats: 0,
    },
  },
};

export const VisitorTeamSelected: Story = {
  parameters: {
    queryClient: {
      // currentGameStats: mockSelectedGame,
    },
    useNBAEverythingAtoms: {
      selectedMode: 'light',
      selectedTeamStats: 1,
    },
  },
};
