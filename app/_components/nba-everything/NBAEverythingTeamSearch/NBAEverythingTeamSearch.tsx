'use client';
import { useEffect } from 'react';

import { useNBAEverythingAtoms } from '@/store';
import { SearchBar } from '@/components/common';
import { useNBAEverythingClient } from '@/app/_hooks';

export default function NBAEverythingTeamSearch() {
  const { selectedTeam, setSelectedTeam } = useNBAEverythingAtoms();

  const { currentTeamsData, isCurrentTeamsPending, isCurrentTeamSeasonPending } =
    useNBAEverythingClient({
      shouldReturnTeams: true,
      shouldReturnTeamSeasonData: true,
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
      isDisabled={isCurrentTeamsPending || isCurrentTeamSeasonPending}
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
