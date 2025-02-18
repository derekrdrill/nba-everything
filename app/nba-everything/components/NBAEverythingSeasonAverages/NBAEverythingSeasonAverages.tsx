import { useQuery } from '@tanstack/react-query';
import { ShimmerDiv } from 'shimmer-effects-react';

import { useNBAEverythingStore } from '@store';
import { NBASeasonAverage } from '@app/nba-everything/components/NBAEverythingSeasonAverages/components';
import { NBATeamStats } from '@types';

export default function NBAEverythingSeasonAverages() {
  const { selectedTeam, selectedSeason } = useNBAEverythingStore();
  const { data: currentTeamSeasonAvgs, isPending: isCurrentTeamSeasonAvgsPending } =
    useQuery<NBATeamStats>({
      enabled: !!(selectedTeam?.id && selectedSeason),
      queryKey: ['getSeasonAverages', selectedSeason, selectedTeam?.id],
    });

  return (
    <>
      {isCurrentTeamSeasonAvgsPending && (
        <div className='flex gap-8'>
          <ShimmerDiv height={400} loading mode='light' width={'18%'} />
          <ShimmerDiv height={400} loading mode='light' width={'82%'} />
        </div>
      )}
      {!isCurrentTeamSeasonAvgsPending && (
        <div className='flex flex-col gap-1 md:gap-2 lg:gap-3'>
          <NBASeasonAverage
            statValue={`${currentTeamSeasonAvgs?.wins}-${currentTeamSeasonAvgs?.losses}`}
            statTitle='W-L'
          />
          <NBASeasonAverage statValue={currentTeamSeasonAvgs?.ppg.toFixed(1)} statTitle='PPG' />
          <NBASeasonAverage statValue={currentTeamSeasonAvgs?.rpg.toFixed(1)} statTitle='RPG' />
          <NBASeasonAverage statValue={currentTeamSeasonAvgs?.apg.toFixed(1)} statTitle='APG' />
          <NBASeasonAverage statValue={currentTeamSeasonAvgs?.spg.toFixed(1)} statTitle='SPG' />
          <NBASeasonAverage statValue={currentTeamSeasonAvgs?.bpg.toFixed(1)} statTitle='BPG' />
        </div>
      )}
    </>
  );
}
