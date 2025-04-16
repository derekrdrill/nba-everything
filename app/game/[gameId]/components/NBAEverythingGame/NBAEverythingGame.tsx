'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Dialog, DialogPanel, Tab, TabGroup, TabList } from '@headlessui/react';
import classNames from 'classnames';

import { useNBAEverythingAtoms } from '@/store';
import { useNBAEverythingClient } from '@/app/_hooks';
import {
  NBAEverythingGameBoxScore,
  NBAEverythingGameShimmer,
  NBAEverythingGameStatLeaders,
  NBAEverythingGameStatus,
  NBAEverythingGameTeamAndLogo,
  NBAEverythingGameTeamScore,
} from '@/app/game/[gameId]/components';
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
    selectedMode,
  } = useNBAEverythingAtoms();

  const { currentTeamSeasonData, isCurrentGameStatsPending, isCurrentTeamSeasonPending } =
    useNBAEverythingClient({
      shouldReturnGameStats: true,
      shouldReturnTeamSeasonData: true,
    });

  useEffect(() => {
    if (pathName.includes('game')) {
      const gameId = pathName.split('/')[2];
      const game = currentTeamSeasonData?.gameData.find(game => game?.id === Number(gameId));
      setSelectedGame(game);
    }
  }, [pathName, currentTeamSeasonData]);

  return (
    <Dialog
      className='flex items-center justify-center'
      onClose={() => setSelectedGame(undefined)}
      open={!isCurrentTeamSeasonPending && !!selectedGame}
    >
      <DialogPanel
        className={classNames('game-dialog-panel', {
          'bg-white': selectedMode === 'light',
          'bg-gray-900 text-white': selectedMode === 'dark',
        })}
        style={{
          ...(selectedMode === 'team' && {
            backgroundColor: `#${selectedTeam?.colors.secondary}`,
            color: `#${selectedTeam?.colors.primary}`,
          }),
        }}
      >
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
        {isCurrentGameStatsPending && <NBAEverythingGameShimmer />}
        <div className='px-6'>
          {!isCurrentGameStatsPending && (
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
        <div className='bottom-0 flex justify-end pb-6 pt-4 px-8 sticky z-50'>
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
