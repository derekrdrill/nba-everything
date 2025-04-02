import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NBAEverythingTeamGames from './NBAEverythingTeamGames';
import { useNBAEverythingStore } from '@/store';
import { NBATeamStats, NBAGame, NBATeam } from '@/types';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Mock data
const mockTeam: NBATeam = {
  id: 1610612747,
  conference: 'Western',
  division: 'Pacific',
  city: 'Los Angeles',
  name: 'Lakers',
  full_name: 'Los Angeles Lakers',
  abbreviation: 'LAL',
  coach: 'Darvin Ham',
  colors: {
    primary: '552583',
    secondary: 'FDB927',
    tertiary: '000000',
    quaternary: 'FFFFFF',
  },
  logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
  stadium: {
    name: 'Crypto.com Arena',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    capacity: '19068',
    address: '1111 S Figueroa St',
    zip: '90015',
    geoLat: '34.043056',
    geoLong: '-118.267222',
  },
};

const mockGames: NBAGame[] = [
  {
    id: 1,
    date: '2024-03-15',
    datetime: '2024-03-15T19:30:00',
    home_team_score: 120,
    visitor_team_score: 115,
    period: 4,
    postseason: false,
    season: 2023,
    status: 'Final',
    time: '7:30 PM',
    home_team: mockTeam,
    visitor_team: {
      ...mockTeam,
      id: 1610612744,
      name: 'Warriors',
      full_name: 'Golden State Warriors',
      abbreviation: 'GSW',
      logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    },
    win: true,
  },
  {
    id: 2,
    date: '2024-03-16',
    datetime: '2024-03-16T19:30:00',
    home_team_score: 115,
    visitor_team_score: 120,
    period: 4,
    postseason: false,
    season: 2023,
    status: 'Final',
    time: '7:30 PM',
    home_team: mockTeam,
    visitor_team: {
      ...mockTeam,
      id: 1610612744,
      name: 'Warriors',
      full_name: 'Golden State Warriors',
      abbreviation: 'WAS',
      logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    },
    win: false,
  },
  {
    id: 3,
    date: '2024-03-17',
    datetime: '2024-03-17T19:30:00',
    home_team_score: 115,
    visitor_team_score: 120,
    period: 4,
    postseason: false,
    season: 2023,
    status: 'Final',
    time: '7:30 PM',
    visitor_team: mockTeam,
    home_team: {
      ...mockTeam,
      id: 1610612744,
      name: 'Warriors',
      full_name: 'Golden State Warriors',
      abbreviation: 'WAS',
      logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    },
    win: true,
  },
  {
    id: 4,
    date: '2024-03-18',
    datetime: '2024-03-18T19:30:00',
    home_team_score: 115,
    visitor_team_score: 120,
    period: 4,
    postseason: false,
    season: 2023,
    status: 'Final',
    time: '7:30 PM',
    visitor_team: mockTeam,
    home_team: {
      ...mockTeam,
      id: 1610612744,
      name: 'Warriors',
      full_name: 'Golden State Warriors',
      abbreviation: 'WAS',
      logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    },
    win: false,
  },
];

const mockTeamStats: NBATeamStats = {
  apg: 25.5,
  bpg: 5.2,
  gameData: mockGames,
  losses: 25,
  ppg: 115.8,
  rpg: 42.3,
  spg: 7.8,
  wins: 35,
};

// Story configuration
const meta: Meta<typeof NBAEverythingTeamGames> = {
  title: 'Components/NBAEverything/NBAEverythingTeamGames',
  component: NBAEverythingTeamGames,
  decorators: [
    Story => {
      // Reset and configure query client for each story
      queryClient.clear();
      queryClient.setQueryData(['getTeamSeasonData', 2023, mockTeam.id], mockTeamStats);

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NBAEverythingTeamGames>;

// Base story setup function
const setupStory = (mode: 'dark' | 'light' | 'team') => {
  useNBAEverythingStore.setState({
    selectedMode: mode,
    selectedSeason: 2023,
    selectedTeam: mockTeam,
  });
};

export const Default: Story = {
  decorators: [
    Story => {
      setupStory('light');
      return <Story />;
    },
  ],
};
