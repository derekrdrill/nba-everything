import { useQuery } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@/store';
import { SearchBar } from '@/components/common';
import { NBA_SEASONS } from '@/components/nba-everything/NBAEverythingSeasonSearch/constants';
import { NBATeam, NBATeamStats } from '@/types';
import { getCurrentTeams, getTeamSeasonData, getSeasons } from '@/app/_api/get';

export default function NBAEverythingSeasonSearch() {
  const { selectedSeason, selectedTeam, setSelectedSeason } = useNBAEverythingStore();

  const { isPending: isCurrentTeamsPending } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const { isPending: isCurrentTeamSeasonPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  const { data: seasonData, isPending: isSeasonsPending } = useQuery<
    { label: string; value: string }[]
  >({
    enabled: true,
    queryKey: ['getSeasons'],
    queryFn: getSeasons,
  });

  const searchBarSeasonOptions = seasonData?.map(season => ({
    label: season.label,
    value: season.value,
  }));

  return (
    <SearchBar
      options={searchBarSeasonOptions}
      isDisabled={isCurrentTeamsPending || isCurrentTeamSeasonPending || isSeasonsPending}
      handleOptionSelect={value => {
        const selectedSeason = NBA_SEASONS?.find(season => season.year === Number(value))?.year;
        if (selectedSeason) {
          setSelectedSeason(selectedSeason);
        }
      }}
      value={selectedSeason?.toString() ?? '2024'}
    />
  );
}
