'use client';
import { ShimmerDiv } from 'shimmer-effects-react';
import { useQuery } from '@tanstack/react-query';

import { getCurrentTeams, getTeamSeasonData } from '@api/get';
import {
  NBAEverythingSeasonAverages,
  NBAEverythingSeasonSearch,
  NBAEverythingTeamDetail,
  NBAEverythingTeamGames,
  NBAEverythingTeamSearch,
} from '@components/nba-everything';
import { useNBAEverythingStore } from '@store';
import { NBATeamStats, NBATeam } from '@types';

export default function NBAEverything() {
  const { selectedTeam, selectedSeason } = useNBAEverythingStore();

  useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const { isPending: isCurrentTeamSeasonAvgsPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  return (
    <div className='flex flex-col gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
      <div className='flex flex-col gap-8 justify-between md:flex-row'>
        <NBAEverythingTeamSearch />
        <NBAEverythingSeasonSearch />
      </div>
      <div className='grid grid-cols-2 gap-8 mt-6'>
        <div className='col-span-full md:col-span-1'>
          <NBAEverythingTeamDetail />
        </div>
        <div className='col-span-full md:col-span-1'>
          {isCurrentTeamSeasonAvgsPending && (
            <div className='flex flex-col gap-8 md:flex-row'>
              <ShimmerDiv
                className='h-12 rounded w-full md:h-[400px] md:w-[18%]'
                height={0}
                loading
                mode='light'
                width={0}
              />
              <ShimmerDiv
                className='h-80 rounded w-full md:h-[400px] md:w-[82%]'
                height={0}
                loading
                mode='light'
                width={0}
              />
            </div>
          )}
          {!isCurrentTeamSeasonAvgsPending && (
            <div className='grid grid-cols-12 gap-8'>
              <NBAEverythingSeasonAverages />
              <NBAEverythingTeamGames />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
