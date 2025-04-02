import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NBAEverythingTeamGame from './NBAEverythingTeamGame';
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

const mockGameData = {
  gameData: [
    {
      id: '1',
      date: '2024-03-15',
      time: '7:00 PM',
      status: 'Final',
      win: true,
      home_team: {
        id: 1,
        abbreviation: 'CHA',
        name: 'Charlotte Hornets',
      },
      visitor_team: {
        id: 2,
        abbreviation: 'BOS',
        name: 'Boston Celtics',
      },
      home_team_score: 120,
      visitor_team_score: 115,
    },
    {
      id: '2',
      date: '2024-03-13',
      time: '8:30 PM',
      status: 'Final',
      win: false,
      home_team: {
        id: 3,
        abbreviation: 'MIA',
        name: 'Miami Heat',
      },
      visitor_team: {
        id: 1,
        abbreviation: 'CHA',
        name: 'Charlotte Hornets',
      },
      home_team_score: 108,
      visitor_team_score: 102,
    },
    {
      id: '3',
      date: '2024-03-10',
      time: '6:00 PM',
      status: 'Final',
      win: true,
      home_team: {
        id: 1,
        abbreviation: 'CHA',
        name: 'Charlotte Hornets',
      },
      visitor_team: {
        id: 4,
        abbreviation: 'ORL',
        name: 'Orlando Magic',
      },
      home_team_score: 112,
      visitor_team_score: 105,
    },
    {
      id: '4',
      date: '2024-03-08',
      time: '7:30 PM',
      status: 'Final',
      win: false,
      home_team: {
        id: 5,
        abbreviation: 'ATL',
        name: 'Atlanta Hawks',
      },
      visitor_team: {
        id: 1,
        abbreviation: 'CHA',
        name: 'Charlotte Hornets',
      },
      home_team_score: 115,
      visitor_team_score: 110,
    },
  ],
};

const meta: Meta<typeof NBAEverythingTeamGame> = {
  title: 'Components/NBAEverything/NBAEverythingTeamGames/NBAEverythingTeamGame',
  component: NBAEverythingTeamGame,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
  decorators: [
    (Story, context) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      const selectedMode = context.parameters.selectedMode || 'light';
      const selectedTeam = context.parameters.selectedTeam || mockTeam;
      const selectedSeason = context.parameters.selectedSeason || '2023-24';

      useNBAEverythingStore.setState({
        selectedMode,
        selectedTeam,
        selectedSeason,
      });

      queryClient.setQueryData(
        ['getTeamSeasonData', selectedSeason, selectedTeam.id],
        context.parameters.mockData || mockGameData,
      );

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
};

export default meta;
type Story = StoryObj<typeof NBAEverythingTeamGame>;

const defaultStyle = {
  width: '200px',
  height: '150px',
};

export const WinAsHome: Story = {
  args: {
    columnIndex: 0,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockGameData,
  },
};

export const LossAsVisitor: Story = {
  args: {
    columnIndex: 1,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockGameData,
  },
};

export const WinAsVisitor: Story = {
  args: {
    columnIndex: 2,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockGameData,
  },
};

export const LossAsHome: Story = {
  args: {
    columnIndex: 3,
    rowIndex: 0,
    style: defaultStyle,
  },
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
    selectedSeason: '2023-24',
    mockData: mockGameData,
  },
};
