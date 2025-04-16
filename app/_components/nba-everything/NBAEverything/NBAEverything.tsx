'use client';
import { useEffect } from 'react';
import { ShimmerDiv } from 'shimmer-effects-react';

import { useNBAEverythingAtoms } from '@/store';
import {
  NBAEverythingSeasonAverages,
  NBAEverythingSeasonSearch,
  NBAEverythingTeamDetail,
  NBAEverythingTeamGames,
  NBAEverythingTeamSearch,
} from '@/components/nba-everything';
import { useNBAEverythingClient } from '@/app/_hooks';
import { getTeamModeMainColor } from '@/helpers';

export default function NBAEverything() {
  const { selectedMode, selectedTeam, selectedSeason } = useNBAEverythingAtoms();
  const { isCurrentTeamSeasonPending } = useNBAEverythingClient({
    shouldReturnTeamSeasonData: true,
  });

  useEffect(() => {
    if (selectedMode === 'light') {
      document.body.setAttribute('style', '');
      document.body.setAttribute('style', 'background-color: white;');
      document.querySelector('.header-text')?.setAttribute('style', 'color: black;');
    } else if (selectedMode === 'dark') {
      document.body.setAttribute('style', '');
      document.body.setAttribute('style', 'background-color: black;');
      document.querySelector('.header-text')?.setAttribute('style', 'color: white;');
    } else if (selectedMode === 'team' && selectedTeam) {
      document.body.setAttribute('style', '');
      document.body.setAttribute(
        'style',
        `background-color: #${getTeamModeMainColor({
          primaryColor: selectedTeam.colors.primary,
          secondaryColor: selectedTeam.colors.secondary,
        })};`,
      );
      document.querySelector('.header-text')?.setAttribute('style', 'color: white;');
    }
  }, [selectedMode, selectedTeam]);

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
          {isCurrentTeamSeasonPending && (
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
          {!isCurrentTeamSeasonPending && (
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
