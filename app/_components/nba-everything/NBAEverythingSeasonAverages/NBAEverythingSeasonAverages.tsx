import { useNBAEverythingStore } from '@/store';
import { NBASeasonAverage } from '@/components/nba-everything/NBAEverythingSeasonAverages/components';
import { useNBAEverythingQuery } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { NBATeamStats } from '@/app/_types';
import { getTeamSeasonData } from '@/app/_api/get';

export default function NBAEverythingSeasonAverages() {
  const { selectedTeam, selectedSeason } = useNBAEverythingStore();

  const { currentTeamSeasonData } = useNBAEverythingQuery({
    selectedTeam: selectedTeam,
    selectedSeason: selectedSeason,
  });

  const { isPending: isCurrentTeamSeasonPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  if (isCurrentTeamSeasonPending) {
    return <div>Loading...</div>;
  }

  if (!currentTeamSeasonData) {
    return null;
  }

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
