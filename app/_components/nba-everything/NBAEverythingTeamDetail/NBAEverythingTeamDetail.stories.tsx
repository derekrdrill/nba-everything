import type { Meta, StoryObj } from '@storybook/react';
import NBAEverythingTeamDetail from './NBAEverythingTeamDetail';
import { useNBAEverythingStore } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import classNames from 'classnames';
import '@/app/_styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockTeam = {
  id: 1,
  full_name: 'Charlotte Hornets',
  colors: {
    primary: '00788C',
    secondary: '1D1160',
    tertiary: 'A1A1A4',
    quaternary: 'FFFFFF',
  },
  logo: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg',
  stadium: {
    name: 'Spectrum Center',
    address: '330 E. Trade St.',
    city: 'Charlotte',
    state: 'NC',
    zip: '28202',
    country: 'USA',
    capacity: 19026,
    geoLat: 35.225,
    geoLong: -80.839167,
  },
};

const meta: Meta<typeof NBAEverythingTeamDetail> = {
  title: 'Components/NBAEverything/NBAEverythingTeamDetail',
  component: NBAEverythingTeamDetail,
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
type Story = StoryObj<typeof NBAEverythingTeamDetail>;

export const Default: Story = {
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
  },
};

export const DarkMode: Story = {
  parameters: {
    selectedMode: 'dark',
    selectedTeam: mockTeam,
  },
};

export const TeamMode: Story = {
  parameters: {
    selectedMode: 'team',
    selectedTeam: mockTeam,
  },
};

export const Loading: Story = {
  parameters: {
    selectedMode: 'light',
    selectedTeam: mockTeam,
  },
  decorators: [
    Story => (
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                enabled: false, // This will keep the query in pending state
              },
            },
          })
        }
      >
        <div className='w-full max-w-4xl p-4 min-h-screen bg-white'>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};
