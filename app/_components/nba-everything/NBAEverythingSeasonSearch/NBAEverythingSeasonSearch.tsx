import { useQuery } from '@tanstack/react-query';
import { useNBAEverythingState } from '@/store';
import { SearchBar } from '@/components/common';
import { NBA_SEASONS } from '@/components/nba-everything/NBAEverythingSeasonSearch/constants';
import { NBATeam, NBATeamStats } from '@/types';

export default function NBAEverythingSeasonSearch() {
  const { selectedSeason, selectedTeam, setSelectedSeason } = useNBAEverythingState();

  const { isPending: isCurrentTeamsPending } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
  });

  const { isPending: isCurrentTeamSeasonPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
  });

  const searchBarSeasonOptions = NBA_SEASONS.map(season => ({
    label: season.display_year,
    value: season.year.toString(),
  }));

  return (
    <SearchBar
      options={searchBarSeasonOptions}
      isDisabled={isCurrentTeamsPending || isCurrentTeamSeasonPending}
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
