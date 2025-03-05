import Link from 'next/link';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamLogo } from '@components/nba-everything';

export default function NBAEverythingTeamDetail() {
  const { selectedTeam } = useNBAEverythingStore();

  const getStubHubTeamName = ({ fullName }: { fullName?: string }) => {
    if (fullName === 'LA Clippers') {
      return 'los-anageles-clippers';
    }

    return fullName?.replaceAll(' ', '-').toLowerCase();
  };

  return (
    <div className='grid grid-cols-5 gap-4'>
      <div className='col-span-2'>
        <NBAEverythingTeamLogo height={160} team={selectedTeam} width={160} />
      </div>
      <div className='col-span-3'>
        <h1 className='text-4xl'>{selectedTeam?.full_name}</h1>
        <h2 className='text-xl'>{selectedTeam?.stadium.name}</h2>
        <p className='text-sm'>
          {selectedTeam?.stadium.address} {selectedTeam?.stadium.city},{' '}
          {selectedTeam?.stadium.state} {selectedTeam?.stadium.zip}
        </p>
        <p className='text-sm'>
          <span className='font-bold'>Capacity</span>:{' '}
          {selectedTeam?.stadium.capacity.toLocaleString()}
        </p>
        <Link
          className='text-blue-500 text-sm underline hover:text-blue-700'
          href={`https://www.stubhub.com/${getStubHubTeamName({
            fullName: selectedTeam?.full_name,
          })}-tickets`}
          target='_blank'
          rel='noreferrer'
        >
          See tickets on Stubhub
        </Link>
      </div>
    </div>
  );
}
