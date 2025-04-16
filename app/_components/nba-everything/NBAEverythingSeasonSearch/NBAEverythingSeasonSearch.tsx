import { useNBAEverythingAtoms } from '@/store';
import { SearchBar } from '@/components/common';
import { NBA_SEASONS } from '@/components/nba-everything/NBAEverythingSeasonSearch/constants';
import { useNBAEverythingClient } from '@/app/_hooks';

export default function NBAEverythingSeasonSearch() {
  const { selectedSeason, setSelectedSeason } = useNBAEverythingAtoms();
  const { isCurrentTeamsPending, isCurrentTeamSeasonPending } = useNBAEverythingClient({
    shouldReturnTeams: true,
    shouldReturnTeamSeasonData: true,
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
