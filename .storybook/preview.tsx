import React from 'react';
import classNames from 'classnames';
import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { mockUseNBAEverythingAtoms, mockTeamsCurrent } from '../mocks';
import { NBAGame, NBASelectedMode, NBATeam } from '../app/_types';
import '../app/_styles/globals.css';

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const isLoading = context.parameters?.isLoading;

      const useNBAEverythingAtoms = context.parameters?.useNBAEverythingAtoms;
      const queryClientState = context.parameters?.queryClient;

      const selectedGame = useNBAEverythingAtoms?.selectedGame as NBAGame;
      const selectedMode = useNBAEverythingAtoms?.selectedMode as NBASelectedMode;
      const selectedSeason = useNBAEverythingAtoms?.selectedSeason as number;
      const selectedTeam = useNBAEverythingAtoms?.selectedTeam as NBATeam;
      const selectedTeamStats = useNBAEverythingAtoms?.selectedTeamStats as number;
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

      mockUseNBAEverythingAtoms({
        useNBAEverythingAtoms: {
          selectedGame: selectedGame as NBAGame,
          selectedMode: selectedMode as NBASelectedMode,
          selectedSeason: selectedSeason as number,
          selectedTeam: selectedTeam as NBATeam,
          selectedTeamStats: selectedTeamStats as number,
        },
      });

      queryClient.setQueryData(['getCurrentTeams', null, null], mockTeamsCurrent);
      queryClient.setQueryData(
        ['getGameStats', useNBAEverythingAtoms?.selectedGame?.id],
        currentGameStats,
      );
      queryClient.setQueryData(
        [
          'getTeamSeasonData',
          useNBAEverythingAtoms?.selectedSeason,
          useNBAEverythingAtoms?.selectedTeam?.id,
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
