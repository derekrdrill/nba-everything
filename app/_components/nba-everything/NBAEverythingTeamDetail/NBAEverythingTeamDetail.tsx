'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ShimmerDiv } from 'shimmer-effects-react';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamLogo } from '@components/nba-everything';
import { NBATeam } from '@types';

export default function NBAEverythingTeamDetail() {
  const { selectedTeam } = useNBAEverythingStore();

  const { isPending: isTeamDataPending } = useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
  });

  const getStubHubTeamName = ({ fullName }: { fullName?: string }) => {
    if (fullName === 'LA Clippers') {
      return 'los-anageles-clippers';
    }

    return fullName?.replaceAll(' ', '-').toLowerCase();
  };

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='col-span-2'>
        {isTeamDataPending && (
          <ShimmerDiv className='rounded' height={160} loading mode='light' width={160} />
        )}
        {!isTeamDataPending && selectedTeam && (
          <NBAEverythingTeamLogo height={160} team={selectedTeam} width={160} />
        )}
      </div>
      <div className='col-span-3'>
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
          <>
            <h1 className='text-4xl'>{selectedTeam.full_name}</h1>
            <h2 className='text-xl'>{selectedTeam.stadium.name}</h2>
            <p className='text-sm'>
              {selectedTeam.stadium.address} {selectedTeam.stadium.city},{' '}
              {selectedTeam.stadium.state} {selectedTeam.stadium.zip}
            </p>
            <p className='text-sm'>
              <span className='font-bold'>Capacity</span>:{' '}
              {selectedTeam.stadium.capacity.toLocaleString()}
            </p>
            <Link
              className='text-blue-500 text-sm underline hover:text-blue-700'
              href={`https://www.stubhub.com/${getStubHubTeamName({
                fullName: selectedTeam.full_name,
              })}-tickets`}
              target='_blank'
              rel='noreferrer'
            >
              See tickets on Stubhub
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
