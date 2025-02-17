import { SearchBar } from '@app/components';
import { useNBAEverythingStore } from '@store';

type NBAEverythingSeasonSearchProps = {};
import { NBA_SEASONS } from '@nba-everything/components/NBAEverythingSeasonSearch/constants';

export default function NBAEverythingSeasonSearch({}: NBAEverythingSeasonSearchProps) {
  const { selectedSeason, setSelectedSeason } = useNBAEverythingStore();

  const searchBarSeasonOptions = NBA_SEASONS.map(season => ({
    label: season.display_year,
    value: season.year.toString(),
  }));

  return (
    <SearchBar
      options={searchBarSeasonOptions}
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
