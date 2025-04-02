'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button, Dialog, DialogPanel, Tab, TabGroup, TabList } from '@headlessui/react';

import { useNBAEverythingStore } from '@/store';
import { getGameStats } from '@/app/game/[gameId]/api/get';
import {
  NBAEverythingGameBoxScore,
  NBAEverythingGameShimmer,
  NBAEverythingGameStatLeaders,
  NBAEverythingGameStatus,
  NBAEverythingGameTeamAndLogo,
  NBAEverythingGameTeamScore,
} from '@/app/game/[gameId]/components';
import { NBATeamStats, NBAGameStats } from '@/types';
import '@/app/game/[gameId]/styles/nbaEverythingGame.css';

export default function NBAEverythingGame() {
  const pathName = usePathname();
  const router = useRouter();
  const {
    selectedSeason,
    selectedTeam,
    selectedGame,
    selectedTeamStats,
    setSelectedTeamStats,
    setSelectedGame,
  } = useNBAEverythingStore();

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
        <div className='flex flex-col gap-4 mb-12 pt-8 px-14 md:flex-row md:justify-around md:pt-16 md:px-24'>
          <div className='flex gap-4 justify-between order-2 md:order-1'>
            <NBAEverythingGameTeamAndLogo homeOrVisitor='visitor' />
            <NBAEverythingGameTeamScore homeOrVisitor='visitor' />
          </div>
          <NBAEverythingGameStatus styles='order-1 md:order-2' />
          <div className='flex gap-4 justify-between order-2 md:order-3'>
            <NBAEverythingGameTeamAndLogo homeOrVisitor='home' styles='order-1 md:order-2' />
            <NBAEverythingGameTeamScore homeOrVisitor='home' styles='order-2 md:order-1' />
          </div>
        </div>
        {isNBAGameStatsPending && <NBAEverythingGameShimmer />}
        <div className='px-6'>
          {!isNBAGameStatsPending && (
            <>
              <div className='flex justify-center lg:hidden'>
                <TabGroup
                  onChange={index => {
                    setSelectedTeamStats(index);
                  }}
                  selectedIndex={selectedTeamStats}
                >
                  <TabList className='mb-6 flex gap-0'>
                    <Tab className='tab border-[1px] border-gray-200 py-0.5 px-2 rounded-l-md data-[selected]:bg-blue-200 data-[selected]:border-blue-400'>
                      {selectedGame?.visitor_team?.abbreviation}
                    </Tab>
                    <Tab className='tab border-[1px] border-gray-200 py-0.5 px-2 rounded-r-md data-[selected]:bg-blue-200 data-[selected]:border-blue-400'>
                      {selectedGame?.home_team?.abbreviation}
                    </Tab>
                  </TabList>
                </TabGroup>
              </div>
              <div className='flex flex-col gap-4 max-h-[300px] overflow-y-auto'>
                <NBAEverythingGameStatLeaders />
                <NBAEverythingGameBoxScore />
              </div>
            </>
          )}
        </div>
        <div className='bg-white bottom-0 flex justify-end pb-6 pt-4 px-8 sticky z-50'>
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
