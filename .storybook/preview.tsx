import React from 'react';
import classNames from 'classnames';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { mockUseNBAEverythingAtoms, mockUseNBAEverythingClient } from '../mocks';
import { NBAGame, NBASelectedMode, NBATeam } from '../app/_types';
import '@/styles/globals.css';

const preview: Preview = {
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

      const queryClientState = context.parameters?.queryClient;
      const useNBAEverythingAtoms = context.parameters?.useNBAEverythingAtoms;

      const currentGameStats = queryClientState?.currentGameStats;
      const currentTeams = queryClientState?.currentTeams;
      const currentTeamSeasonData = queryClientState?.currentTeamSeasonData;
      const isCurrentGameStatsPending = queryClientState?.isCurrentGameStatsPending;
      const isCurrentTeamsPending = queryClientState?.isCurrentTeamsPending;
      const isCurrentTeamSeasonPending = queryClientState?.isCurrentTeamSeasonPending;

      const selectedGame = useNBAEverythingAtoms?.selectedGame as NBAGame;
      const selectedMode = useNBAEverythingAtoms?.selectedMode as NBASelectedMode;
      const selectedSeason = useNBAEverythingAtoms?.selectedSeason as number;
      const selectedTeam = useNBAEverythingAtoms?.selectedTeam as NBATeam;
      const selectedTeamStats = useNBAEverythingAtoms?.selectedTeamStats as number;

      mockUseNBAEverythingClient({
        useNBAEverythingClient: {
          currentGameStats,
          currentTeams,
          currentTeamSeasonData,
          isCurrentGameStatsPending,
          isCurrentTeamsPending,
          isCurrentTeamSeasonPending,
        },
      });

      mockUseNBAEverythingAtoms({
        useNBAEverythingAtoms: {
          selectedGame: selectedGame as NBAGame,
          selectedMode: selectedMode as NBASelectedMode,
          selectedSeason: selectedSeason as number,
          selectedTeam: selectedTeam as NBATeam,
          selectedTeamStats: selectedTeamStats as number,
        },
      });

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
            className={classNames(`${bgColor}`)}
            style={{
              padding: '1rem',
            }}
          >
            <Story />
          </div>
        </QueryClientProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: ['centered'],
  },
  tags: ['autodocs'],
};

export default preview;
