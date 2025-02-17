import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import useNBAEverythingStore from '@store/useNBAEverything/useNBAEverything';
import { SearchBar } from '@app/components';
import { NBATeam } from '@types';

const getCurrentTeams = async (): Promise<NBATeam[] | undefined> => {
  const teamOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/teams/current`,
  };

  try {
    const response = await axios.request(teamOptions);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

export default function NBAEverythingTeamSearch() {
  const { selectedTeam, setSelectedTeam } = useNBAEverythingStore();
  const { data: currentTeamsData } = useQuery({
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const searchBarTeamOptions = currentTeamsData?.map(team => ({
    label: team.full_name,
    value: team.id.toString(),
  }));

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
