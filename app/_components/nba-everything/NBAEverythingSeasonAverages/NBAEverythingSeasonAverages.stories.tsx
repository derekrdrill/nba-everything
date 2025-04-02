import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import NBAEverythingSeasonAverages from './NBAEverythingSeasonAverages';
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

const mockTeamData = {
  wins: 45,
  losses: 37,
  ppg: 115.5,
  rpg: 44.2,
  apg: 24.8,
  spg: 7.5,
  bpg: 4.8,
};

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
      const selectedMode = context.parameters.selectedMode || 'light';
      const selectedTeam = context.parameters.selectedTeam || mockTeam;
      const selectedSeason = context.parameters.selectedSeason || '2023-24';

      // Set up the store with the desired state
      useNBAEverythingStore.setState({
        selectedMode,
        selectedTeam,
        selectedSeason,
      });

      // Pre-populate the query cache with mock data
      queryClient.setQueryData(
        ['getTeamSeasonData', selectedSeason, selectedTeam.id],
        context.parameters.mockData || mockTeamData,
      );

      // Determine background color based on mode
      const bgColor =
        selectedMode === 'dark'
          ? 'bg-gray-900'
          : selectedMode === 'team'
            ? 'bg-[#1D1160]'
            : 'bg-white';

      return (
        <QueryClientProvider client={queryClient}>
          <div className={classNames(`w-full max-w-4xl p-4 min-h-screen ${bgColor}`)}>
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

export const Default: Story = {
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockTeamData,
  },
};

export const DarkMode: Story = {
  parameters: {
    selectedMode: 'dark',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockTeamData,
  },
};

export const TeamMode: Story = {
  parameters: {
    selectedMode: 'team',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockTeamData,
  },
};
