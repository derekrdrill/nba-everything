import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import classNames from 'classnames';

import { useNBAEverythingStore } from '@/store';
import NBAEverythingSeasonAverages from './NBAEverythingSeasonAverages';
import { mockTeam, mockTeamStats } from './mocks';

const meta: Meta<typeof NBAEverythingSeasonAverages> = {
  title: 'Components/NBAEverything/NBAEverythingSeasonAverages',
  component: NBAEverythingSeasonAverages,
  decorators: [
    (Story, context) => {
      // Create a new QueryClient for each story
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      // Get the selectedMode from the story parameters
      const selectedMode = context.parameters?.useNBAEverythingStore?.selectedMode;
      const selectedTeam = context.parameters?.useNBAEverythingStore?.selectedTeam;
      const selectedSeason = context.parameters?.useNBAEverythingStore?.selectedSeason;
      const mockData = context.parameters?.queryClient?.currentTeamSeasonData;

      // Set up the store with the desired state
      useNBAEverythingStore.setState({
        selectedMode,
        selectedTeam,
        selectedSeason: selectedSeason,
      });

      // Pre-populate the query cache with mock data
      queryClient.setQueryData(['getTeamSeasonData', selectedSeason, selectedTeam.id], mockData);

      // Determine background color based on mode
      const bgColor =
        selectedMode === 'dark'
          ? 'bg-gray-900'
          : selectedMode === 'team'
            ? 'bg-[#1D1160]'
            : 'bg-white';

      return (
        <QueryClientProvider client={queryClient}>
          <div
            data-testid='nba-everything-season-averages'
            className={classNames(`w-full max-w-4xl p-4 min-h-screen ${bgColor}`)}
          >
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NBAEverythingSeasonAverages>;

export const LightMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingStore: {
      selectedMode: 'light',
      selectedTeam: mockTeam,
      selectedSeason: 2023,
    },
  },
};

export const DarkMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingStore: {
      selectedMode: 'dark',
      selectedTeam: mockTeam,
      selectedSeason: 2023,
    },
  },
};

export const TeamMode: Story = {
  parameters: {
    queryClient: {
      currentTeamSeasonData: mockTeamStats,
    },
    useNBAEverythingStore: {
      selectedMode: 'team',
      selectedTeam: mockTeam,
      selectedSeason: 2023,
    },
  },
};
