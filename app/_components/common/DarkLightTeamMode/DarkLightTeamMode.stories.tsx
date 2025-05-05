import type { Meta, StoryObj } from '@storybook/react';
import DarkLightTeamMode from './DarkLightTeamMode';
import { useNBAEverythingStore } from '@/app/_store';

const meta: Meta<typeof DarkLightTeamMode> = {
  title: 'Components/Common/DarkLightTeamMode',
  component: DarkLightTeamMode,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      // Get the selectedMode from the story parameters
      const selectedMode = context.parameters.selectedMode || 'light';

      // Set up the store with the desired state
      useNBAEverythingStore.setState({ selectedMode });

      return (
        <div className='p-4'>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof DarkLightTeamMode>;

export const Default: Story = {
  args: {},
  parameters: {
    selectedMode: 'light',
  },
};

export const LightMode: Story = {
  args: {},
  parameters: {
    selectedMode: 'light',
  },
};

export const DarkMode: Story = {
  args: {},
  parameters: {
    selectedMode: 'dark',
  },
};

export const TeamMode: Story = {
  args: {},
  parameters: {
    selectedMode: 'team',
    selectedTeam: {
      colors: {
        primary: 'C8102E',
        secondary: 'FDB927',
      },
    },
  },
};
