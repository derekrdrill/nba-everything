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
    useNBAEverythingAtoms: {
      selectedMode: 'light',
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    useNBAEverythingAtoms: {
      selectedMode: 'dark',
    },
  },
};

export const TeamColorFill: Story = {
  parameters: {
    useNBAEverythingAtoms: {
      selectedMode: 'team',
    },
  },
};
