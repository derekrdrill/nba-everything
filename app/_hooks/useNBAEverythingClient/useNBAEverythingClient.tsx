import { useQuery } from '@tanstack/react-query';

import { getCurrentTeams, getTeamSeasonData } from '@/api/get';
import { useNBAEverythingAtoms } from '@/store';
import { NBAGameStats, NBATeam, NBATeamStats } from '@/types';
import { getGameStats } from '@/app/game/[gameId]/api/get';

interface UseNBAEverythingClientProps {
  shouldReturnGameStats?: boolean;
  shouldReturnTeams?: boolean;
  shouldReturnTeamSeasonData?: boolean;
}

export default function useNBAEverythingClient({
  shouldReturnGameStats,
  shouldReturnTeams,
  shouldReturnTeamSeasonData,
}: UseNBAEverythingClientProps) {
  const { selectedGame, selectedTeam, selectedSeason } = useNBAEverythingAtoms();

  const { data: currentTeamsData, isPending: isCurrentTeamsPending } = useQuery<NBATeam[]>({
    enabled: shouldReturnTeams,
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const { data: currentTeamSeasonData, isPending: isCurrentTeamSeasonPending } =
    useQuery<NBATeamStats>({
      enabled: !!(selectedTeam?.id && selectedSeason) && shouldReturnTeamSeasonData,
      queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
      queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
    });

  const { data: currentGameStats, isPending: isCurrentGameStatsPending } = useQuery<{
    homeTeam: NBAGameStats;
    visitorTeam: NBAGameStats;
  }>({
    enabled: !!selectedGame?.id && shouldReturnGameStats,
    queryKey: ['getGameStats', selectedGame?.id],
    queryFn: () => getGameStats({ gameId: selectedGame?.id }),
  });

  return {
    currentGameStats,
    currentTeamsData,
    currentTeamSeasonData,
    isCurrentGameStatsPending,
    isCurrentTeamsPending,
    isCurrentTeamSeasonPending,
  };
}
