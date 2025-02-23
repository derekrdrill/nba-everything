'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button, Dialog, DialogPanel } from '@headlessui/react';

import { useNBAEverythingStore } from '@store';
import { getGameStats } from '@app/game/[gameId]/api/get';
import {
  NBAEverythingGameShimmer,
  NBAEverythingGameStatLeaders,
  NBAEverythingGameStatus,
  NBAEverythingGameTeamAndLogo,
  NBAEverythingGameTeamScore,
} from '@app/game/[gameId]/components';
import { NBATeamStats, NBAGameStats } from '@types';
import '@app/game/[gameId]/styles/nbaEverythingGame.css';

export default function NBAEverythingGame() {
  const pathName = usePathname();
  const router = useRouter();
  const { selectedSeason, selectedTeam, selectedGame, setSelectedGame } = useNBAEverythingStore();

  const { data: nbaTeamSeasonData, isPending: isNBATeamSeasonDataPending } = useQuery<NBATeamStats>(
    {
      enabled: !!(selectedTeam?.id && selectedSeason),
      queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    },
  );

  const { isPending: isNBAGameStatsPending } = useQuery<{
    homeTeam: NBAGameStats;
    visitorTeam: NBAGameStats;
  }>({
    enabled: !!selectedGame?.id,
    queryKey: ['getGameStats', selectedGame?.id],
    queryFn: () => getGameStats({ gameId: selectedGame?.id }),
  });

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
      <DialogPanel className='game-dialog-panel'>
        <div className='flex flex-col gap-4 pt-16 px-14 md:px-24'>
          <div className='flex justify-between'>
            <NBAEverythingGameTeamAndLogo homeOrVisitor='visitor' />
            <div className='flex gap-16 justify-between'>
              <NBAEverythingGameTeamScore homeOrVisitor='visitor' />
              <NBAEverythingGameStatus />
              <NBAEverythingGameTeamScore homeOrVisitor='home' />
            </div>
            <NBAEverythingGameTeamAndLogo homeOrVisitor='home' />
          </div>
          {isNBAGameStatsPending && <NBAEverythingGameShimmer />}
          {!isNBAGameStatsPending && <NBAEverythingGameStatLeaders />}
        </div>
        <div className='bottom-0 flex justify-end p-8 sticky'>
          <Button
            className='btn-secondary-md-outline'
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
