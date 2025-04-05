import React from 'react';
import classNames from 'classnames';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { mockUseNBAEverythingState, mockTeamsCurrent } from '../mocks';
import { NBAGame, NBASelectedMode, NBATeam } from '../app/_types';
import '../app/_styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const isLoading = context.parameters?.isLoading;

      const useNBAEverythingState = context.parameters?.useNBAEverythingState;
      const queryClientState = context.parameters?.queryClient;

      const selectedGame = useNBAEverythingState?.selectedGame as NBAGame;
      const selectedMode = useNBAEverythingState?.selectedMode as NBASelectedMode;
      const selectedSeason = useNBAEverythingState?.selectedSeason as number;
      const selectedTeam = useNBAEverythingState?.selectedTeam as NBATeam;
      const selectedTeamStats = useNBAEverythingState?.selectedTeamStats as number;
      const currentTeamSeasonData = queryClientState?.currentTeamSeasonData;
      const currentGameStats = queryClientState?.currentGameStats;

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            enabled: !isLoading,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      mockUseNBAEverythingState({
        useNBAEverythingState: {
          selectedGame: selectedGame as NBAGame,
          selectedMode: selectedMode as NBASelectedMode,
          selectedSeason: selectedSeason as number,
          selectedTeam: selectedTeam as NBATeam,
          selectedTeamStats: selectedTeamStats as number,
        },
      });

      queryClient.setQueryData(['getCurrentTeams', null, null], mockTeamsCurrent);
      queryClient.setQueryData(
        ['getGameStats', useNBAEverythingState?.selectedGame?.id],
        currentGameStats,
      );
      queryClient.setQueryData(
        [
          'getTeamSeasonData',
          useNBAEverythingState?.selectedSeason,
          useNBAEverythingState?.selectedTeam?.id,
        ],
        currentTeamSeasonData,
      );

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
            className={classNames(`p-4 ${bgColor}`)}
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
