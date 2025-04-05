import type { Meta, StoryObj } from '@storybook/react';
import TeamIcon from './TeamIcon';

const meta: Meta<typeof TeamIcon> = {
  title: 'Components/Common/DarkLightTeamMode/TeamIcon',
  component: TeamIcon,
};

export default meta;
type Story = StoryObj<typeof TeamIcon>;

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

export const TeamColorFill: Story = {
  parameters: {
    useNBAEverythingState: {
      selectedMode: 'team',
    },
  },
};
