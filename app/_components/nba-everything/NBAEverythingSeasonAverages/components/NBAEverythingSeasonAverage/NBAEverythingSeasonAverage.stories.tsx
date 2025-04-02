import type { Meta, StoryObj } from '@storybook/react';
import NBASeasonAverage from './NBAEverythingSeasonAverage';
import { useNBAEverythingStore } from '@/store';
import classNames from 'classnames';
import '@/app/_styles/globals.css';

const mockTeam = {
  id: 1,
  full_name: 'Charlotte Hornets',
  colors: {
    primary: '00788C',
    secondary: '1D1160',
    tertiary: 'A1A1A4',
    quaternary: 'FFFFFF',
  },
};

const meta: Meta<typeof NBASeasonAverage> = {
  title: 'Components/NBAEverything/NBAEverythingSeasonAverages/NBAEverythingSeasonAverage',
  component: NBASeasonAverage,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      // Get the selectedMode from the story parameters
      const selectedMode = context.parameters.selectedMode || 'light';

      // Set up the store with the desired state
      useNBAEverythingStore.setState({
        selectedMode,
        selectedTeam: context.parameters.selectedTeam || mockTeam,
      });

      // Determine background color based on mode
      const bgColor =
        selectedMode === 'dark'
          ? 'bg-gray-900'
          : selectedMode === 'team'
            ? 'bg-[#1D1160]'
            : 'bg-white';

      return (
        <div className={classNames(`w-full max-w-4xl p-4 min-h-screen ${bgColor}`)}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NBASeasonAverage>;

export const Default: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
  },
};

export const DarkMode: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    selectedMode: 'dark',
    selectedTeam: mockTeam,
  },
};

export const TeamMode: Story = {
  args: {
    statTitle: 'PPG',
    statValue: '25.5',
  },
  parameters: {
    selectedMode: 'team',
    selectedTeam: mockTeam,
  },
};

export const WinLoss: Story = {
  args: {
    statTitle: 'W-L',
    statValue: '55-27',
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
  },
};
