import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@/store';
import {
  mockTeam,
  mockTeamStats,
} from '@/app/_components/nba-everything/NBAEverythingSeasonAverages/mocks';
import classNames from 'classnames';

export const queryClientMock = (Story: any, context: any) => {
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
    context.parameters.mockData || mockTeamStats,
  );

  const bgColor =
    selectedMode === 'dark' ? 'bg-gray-900' : selectedMode === 'team' ? 'bg-[#1D1160]' : 'bg-white';

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classNames(`w-full max-w-4xl p-4 min-h-screen ${bgColor}`)}>
        <Story />
      </div>
    </QueryClientProvider>
  );
};
