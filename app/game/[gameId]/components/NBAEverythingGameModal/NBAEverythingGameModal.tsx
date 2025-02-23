'use client';
import axios from 'axios';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingGameModalShimmer } from '@app/game/[gameId]/components/NBAEverythingGameModal/components';
import {
  NBAEverythingGameTeamAndLogo,
  NBAEverythingGameTeamScore,
} from '@app/game/[gameId]/components';
import { NBATeamStats } from '@types';

import { Button, Dialog, DialogPanel } from '@headlessui/react';

const getGameData = async ({ gameId }: { gameId?: number }) => {
  const gameOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/game/${gameId}`,
  };

  try {
    const response = await axios.request(gameOptions);

    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

export default function NBAEverythingGameModal() {
  const pathName = usePathname();
  const router = useRouter();
  const { selectedSeason, selectedTeam, selectedGame, setSelectedGame } = useNBAEverythingStore();

  const { data: nbaTeamSeasonData, isPending: isNBATeamSeasonDataPending } = useQuery<NBATeamStats>(
    {
      enabled: !!(selectedTeam?.id && selectedSeason),
      queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    },
  );

  const { data: nbaGameData, isPending: isNBAGameDataPending } = useQuery({
    enabled: !!selectedGame?.id,
    queryKey: ['getGameData', selectedGame?.id],
    queryFn: () => getGameData({ gameId: selectedGame?.id }),
  });

  console.log(nbaGameData);

  useEffect(() => {
    if (pathName.includes('game')) {
      const gameId = pathName.split('/')[2];
      const game = nbaTeamSeasonData?.gameData.find(game => game?.id === Number(gameId));
      setSelectedGame(game);
    }
  }, [pathName, nbaTeamSeasonData]);

  return (
    <Dialog
      className='flex items-center justify-center'
      onClose={() => setSelectedGame(undefined)}
      open={!isNBATeamSeasonDataPending && !!selectedGame}
    >
      <DialogPanel className='bg-white border-2 border-gray-100 container flex flex-col fixed mx-2 rounded-md top-1/4 z-50 w-full sm:mx-auto'>
        <div className='flex justify-between p-16'>
          <NBAEverythingGameTeamAndLogo homeOrVisitor='visitor' />
          <div className='flex gap-16 justify-between'>
            <NBAEverythingGameTeamScore homeOrVisitor='visitor' />
            <p className='text-lg'>Final</p>
            <NBAEverythingGameTeamScore homeOrVisitor='home' />
          </div>
          <NBAEverythingGameTeamAndLogo homeOrVisitor='home' />
        </div>
        {isNBAGameDataPending && <NBAEverythingGameModalShimmer />}
        <div className='flex justify-end p-8'>
          <Button
            className='btn-outline-secondary'
            onClick={() => {
              setSelectedGame(undefined);
              router.push('/');
            }}
          >
            Close
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
