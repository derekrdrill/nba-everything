import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@/store';
import { NBASeasonAverage } from '@/components/nba-everything/NBAEverythingSeasonAverages/components';
import { NBATeamStats } from '@/types';
import { getTeamSeasonData } from '@/api/get';

export default function NBAEverythingSeasonAverages() {
  const { selectedTeam, selectedSeason } = useNBAEverythingStore();
  console.log('selectedTeam', selectedTeam);
  console.log('selectedSeason', selectedSeason);

  const { data: currentTeamSeasonData } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    // queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  return (
    <div className='col-span-full flex flex-row gap-3 md:flex-col md:col-span-3 lg:col-span-2'>
      <NBASeasonAverage
        statValue={`${currentTeamSeasonData?.wins}-${currentTeamSeasonData?.losses}`}
        statTitle='W-L'
      />
      <NBASeasonAverage statValue={currentTeamSeasonData?.ppg.toFixed(1)} statTitle='PPG' />
      <NBASeasonAverage statValue={currentTeamSeasonData?.rpg.toFixed(1)} statTitle='RPG' />
      <NBASeasonAverage statValue={currentTeamSeasonData?.apg.toFixed(1)} statTitle='APG' />
      <NBASeasonAverage statValue={currentTeamSeasonData?.spg.toFixed(1)} statTitle='SPG' />
      <NBASeasonAverage statValue={currentTeamSeasonData?.bpg.toFixed(1)} statTitle='BPG' />
    </div>
  );
}
