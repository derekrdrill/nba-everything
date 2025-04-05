import type { Meta, StoryObj } from '@storybook/react';
import DarkLightTeamMode from './DarkLightTeamMode';

const meta: Meta<typeof DarkLightTeamMode> = {
  title: 'Components/Common/DarkLightTeamMode',
  component: DarkLightTeamMode,
};

export default meta;
type Story = StoryObj<typeof DarkLightTeamMode>;

export const LightMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'light',
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'dark',
    },
  },
};

export const TeamMode: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'team',
      selectedTeam: {
        colors: {
          primary: 'C8102E',
          secondary: 'FDB927',
        },
      },
    },
  },
};
