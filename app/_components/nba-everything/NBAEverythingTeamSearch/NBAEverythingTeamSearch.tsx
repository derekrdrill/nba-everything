'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingState } from '@/store';
import { SearchBar } from '@/components/common';
import { NBATeam, NBATeamStats } from '@/types';

export default function NBAEverythingTeamSearch() {
  const { selectedSeason, selectedTeam, setSelectedTeam } = useNBAEverythingState();
  const { data: currentTeamsData, isPending: isCurrentTeamsPending } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
  });

  const { isPending: isCurrentTeamSeasonPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
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
