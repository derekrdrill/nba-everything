import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingSeasonAverages from './NBAEverythingSeasonAverages';
import { mockTeam, mockTeamStats } from './mocks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@/store';
import classNames from 'classnames';

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
      const selectedMode = context.parameters?.selectedMode || 'light';
      const selectedTeam = context.parameters?.selectedTeam || mockTeam;
      const selectedSeason = context.parameters?.selectedSeason || 2023;
      const mockData = context.parameters?.mockData || mockTeamStats;

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
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof NBAEverythingSeasonAverages>;

export const LightMode: Story = {
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: 2023,
    mockData: mockTeamStats,
  },
};

export const DarkMode: Story = {
  parameters: {
    selectedMode: 'dark',
    selectedTeam: mockTeam,
    selectedSeason: 2023,
    mockData: mockTeamStats,
  },
};

export const TeamMode: Story = {
  parameters: {
    selectedMode: 'team',
    selectedTeam: mockTeam,
    selectedSeason: 2023,
    mockData: mockTeamStats,
  },
};
