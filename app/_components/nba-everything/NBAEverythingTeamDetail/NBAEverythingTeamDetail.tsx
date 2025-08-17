'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { ShimmerDiv } from 'shimmer-effects-react';
import { useQuery } from '@tanstack/react-query';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { useNBAEverythingStore } from '@/store';
import { NBAEverythingTeamLogo } from '@/components/nba-everything';
import { getTeamModeSecondaryColor } from '@/helpers';
import { NBATeam } from '@/types';
import { getCurrentTeams } from '@/app/_api/get';

export default function NBAEverythingTeamDetail() {
  const { selectedMode, selectedTeam } = useNBAEverythingStore();

  const { isPending: isTeamDataPending } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const getStubHubTeamName = ({ fullName }: { fullName?: string }) => {
    if (fullName === 'LA Clippers') {
      return 'los-anageles-clippers';
    }

    return fullName?.replaceAll(' ', '-').toLowerCase();
  };

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='col-span-full flex justify-center md:col-span-2'>
        {isTeamDataPending && (
          <ShimmerDiv
            className='h-80 rounded w-full sm:h-64 sm:w-64 md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48'
            height={0}
            loading
            mode='light'
            width={0}
          />
        )}
        {!isTeamDataPending && selectedTeam && (
          <NBAEverythingTeamLogo
            height={0}
            imageStyles={classNames('h-auto w-72', {
              'bg-gray-700 py-4 px-6 rounded': selectedMode === 'dark',
            })}
            team={selectedTeam}
            width={0}
          />
        )}
      </div>
      <div className='col-span-full md:col-span-3'>
        {isTeamDataPending && (
          <div className='flex flex-col gap-2'>
            <ShimmerDiv className='rounded' height={45} loading mode='light' width={'90%'} />
            <ShimmerDiv className='rounded' height={20} loading mode='light' width={'80%'} />
            <ShimmerDiv className='rounded' height={20} loading mode='light' width={'80%'} />
            <ShimmerDiv className='rounded' height={20} loading mode='light' width={'80%'} />
            <ShimmerDiv className='rounded' height={20} loading mode='light' width={'80%'} />
          </div>
        )}
        {!isTeamDataPending && selectedTeam && (
          <div
            className={classNames({
              'text-white': selectedMode === 'dark',
              'text-black': selectedMode === 'light',
            })}
            style={{
              color:
                selectedMode === 'team'
                  ? `#${getTeamModeSecondaryColor({
                      primaryColor: selectedTeam.colors.primary,
                      secondaryColor: selectedTeam.colors.secondary,
                    })}`
                  : '',
            }}
          >
            <h1 className='text-4xl'>{selectedTeam.full_name}</h1>
            <h2 className='text-xl'>{selectedTeam.stadium.name}</h2>
            <p className='text-sm'>
              {selectedTeam.stadium.address} {selectedTeam.stadium.city},{' '}
              {selectedTeam.stadium.state} {selectedTeam.stadium.zip}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Capacity</span>:{' '}
              {selectedTeam.stadium?.capacity?.toLocaleString()}
            </p>
            <Link
              className={classNames('text-sm underline', {
                'text-blue-500 hover:text-blue-700': selectedMode !== 'team',
              })}
              href={`https://www.stubhub.com/${getStubHubTeamName({
                fullName: selectedTeam.full_name,
              })}-tickets`}
              target='_blank'
              rel='noreferrer'
            >
              See tickets on Stubhub <ArrowTopRightOnSquareIcon className='h-4 w-4 inline' />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
