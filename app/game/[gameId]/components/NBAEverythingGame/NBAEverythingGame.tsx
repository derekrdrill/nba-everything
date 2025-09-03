'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Button, Dialog, DialogPanel, Tab, TabGroup, TabList } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

import { useNBAEverythingStore } from '@/store';
import { getGameStats } from '@/app/game/[gameId]/api/get';
import {
  NBAEverythingGameBoxScore,
  NBAEverythingGameShimmer,
  NBAEverythingGameStatLeaders,
  NBAEverythingGameStatus,
  NBAEverythingGameSummary,
  NBAEverythingGameTeamAndLogo,
  NBAEverythingGameTeamScore,
} from '@/app/game/[gameId]/components';
import { NBATeamStats, NBAGameStats } from '@/types';
import '@/app/game/[gameId]/styles/nbaEverythingGame.css';
import classNames from 'classnames';
import { getTeamSeasonData } from '@/api/get';

export default function NBAEverythingGame() {
  const pathName = usePathname();
  const router = useRouter();
  const {
    currentTeamSeasonData,
    selectedSeason,
    selectedTeam,
    selectedGame,
    selectedTeamStats,
    setSelectedTeamStats,
    setSelectedGame,
    selectedMode,
  } = useNBAEverythingStore();

  const { isPending: isCurrentTeamSeasonPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  const { data: gameData, isPending: isNBAGameStatsPending } = useQuery<{
    homeTeam: NBAGameStats;
    visitorTeam: NBAGameStats;
    gameSummary: {
      insight: string;
      keyHighlights: string[];
      overview: string;
    };
  }>({
    enabled: !!selectedGame?.id,
    queryKey: ['getGameStats', selectedGame?.id],
    queryFn: () => getGameStats({ gameId: selectedGame?.id }),
  });

  const gameSummary = gameData?.gameSummary;
  const gameSummaryOverview = gameSummary?.overview;
  const gameSummaryHighlights = gameSummary?.keyHighlights;
  const gameSummaryInsight = gameSummary?.insight;
  const hasNBAGameSummary =
    gameSummaryOverview && gameSummaryHighlights?.length && gameSummaryInsight;

  useEffect(() => {
    if (pathName.includes('game')) {
      const gameId = pathName.split('/')[2];
      const game = currentTeamSeasonData?.gameData.find(game => game?.id === Number(gameId));

      const selectedTeamId = selectedTeam?.id;
      const hasHomeSelectedTeam = selectedGame?.home_team?.id === selectedTeamId;
      setSelectedGame(game);
      setSelectedTeamStats(hasHomeSelectedTeam ? 1 : 0);
    }
  }, [pathName, currentTeamSeasonData, selectedGame, selectedTeam]);

  if (!currentTeamSeasonData) {
    router.push('/');
  }

  return (
    <Dialog
      className='absolute flex items-center justify-center pb-16 z-10'
      onClose={() => setSelectedGame(undefined)}
      open={!isCurrentTeamSeasonPending && !!selectedGame}
    >
      <DialogPanel
        className={classNames('game-dialog-panel', {
          'bg-white': selectedMode === 'light',
          'bg-[#212121] text-white': selectedMode === 'dark',
        })}
        style={{
          ...(selectedMode === 'team' && {
            backgroundColor: `#${selectedTeam?.colors.secondary}`,
            color: `#${selectedTeam?.colors.primary}`,
          }),
        }}
      >
        <div
          className={classNames('top-0 sticky z-50', {
            'bg-white': selectedMode === 'light',
            'bg-[#212121] text-white': selectedMode === 'dark',
          })}
          style={{
            ...(selectedMode === 'team' && {
              backgroundColor: `#${selectedTeam?.colors.secondary}`,
              color: `#${selectedTeam?.colors.primary}`,
            }),
          }}
        >
          <div className='flex justify-end p-4'>
            <Button
              className='btn-danger-sm'
              onClick={() => {
                setSelectedGame(undefined);
                router.push('/');
              }}
            >
              <XMarkIcon height={20} width={14} />
            </Button>
          </div>
          <div className='flex flex-col gap-4 px-14 md:flex-row md:justify-around md:mb-12 md:px-24'>
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
          <div className='flex justify-center lg:hidden'>
            <TabGroup
              onChange={index => {
                setSelectedTeamStats(index);
              }}
              selectedIndex={selectedTeamStats}
            >
              <TabList className='mb-6 flex gap-0'>
                <Tab
                  className={classNames(
                    'tab border-[1px] border-gray-200 py-0.5 px-2 rounded-l-md',
                    {
                      'data-[selected]:bg-blue-200 data-[selected]:border-blue-400':
                        selectedMode !== 'dark',
                      'data-[selected]:bg-blue-400 data-[selected]:border-blue-600':
                        selectedMode === 'dark',
                    },
                  )}
                >
                  {selectedGame?.visitor_team?.abbreviation}
                </Tab>
                <Tab
                  className={classNames(
                    'tab border-[1px] border-gray-200 py-0.5 px-2 rounded-r-md',
                    {
                      'data-[selected]:bg-blue-200 data-[selected]:border-blue-400':
                        selectedMode !== 'dark',
                      'data-[selected]:bg-blue-400 data-[selected]:border-blue-600':
                        selectedMode === 'dark',
                    },
                  )}
                >
                  {selectedGame?.home_team?.abbreviation}
                </Tab>
              </TabList>
            </TabGroup>
          </div>
        </div>
        {isNBAGameStatsPending && <NBAEverythingGameShimmer />}
        <div className='p-3 md:p-6'>
          {!isNBAGameStatsPending && (
            <div className='flex flex-col gap-6'>
              <NBAEverythingGameStatLeaders />
              <NBAEverythingGameBoxScore />
              {hasNBAGameSummary && (
                <NBAEverythingGameSummary
                  insight={gameSummaryInsight}
                  keyHighlights={gameSummaryHighlights}
                  overview={gameSummaryOverview}
                />
              )}
            </div>
          )}
        </div>
      </DialogPanel>
    </Dialog>
  );
}
