import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useNBAEverythingStore from '@store/useNBAEverything/useNBAEverything';
import { SearchBar } from '@app/components';
import { NBATeam } from '@types';

export default function NBAEverythingTeamSearch() {
  const { selectedTeam, setSelectedTeam } = useNBAEverythingStore();
  const { data: currentTeamsData } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
  });

  const searchBarTeamOptions = currentTeamsData?.map(team => ({
    label: team.full_name,
    value: team.id.toString(),
  }));

  useEffect(() => {
    if (currentTeamsData && !selectedTeam) {
      setSelectedTeam(currentTeamsData[0]);
    }
  }, [currentTeamsData]);

  return (
    <SearchBar
      options={searchBarTeamOptions}
      handleOptionSelect={value => {
        const selectedTeam = currentTeamsData?.find(team => team.id === Number(value));
        if (selectedTeam) {
          setSelectedTeam(selectedTeam);
        }
      }}
      value={selectedTeam?.id.toString() ?? '1'}
    />
  );
}
