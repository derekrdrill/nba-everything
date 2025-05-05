import { useQuery } from '@tanstack/react-query';
import { NBATeam, NBATeamStats } from '@/types';
import { getTeamSeasonData } from '@/api/get';

interface UseNBAEverythingQueryProps {
  selectedTeam?: NBATeam;
  selectedSeason: number;
}

function useNBAEverythingQuery({ selectedTeam, selectedSeason }: UseNBAEverythingQueryProps) {
  const { data: currentTeamSeasonData, isPending: isCurrentTeamSeasonDataPending } =
    useQuery<NBATeamStats>({
      enabled: !!(selectedTeam?.id && selectedSeason),
      queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
      queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
    });

  return { currentTeamSeasonData, isCurrentTeamSeasonDataPending };
}

export default useNBAEverythingQuery;
