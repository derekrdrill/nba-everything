'use client';
import { FixedSizeGrid as NBAEverythingTeamGamesGrid } from 'react-window';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamGame } from '@components/nba-everything/NBAEverythingTeamGames/components';
import { NBATeamStats } from '@types';

export default function NBAEverythingTeamGames() {
  const { selectedSeason, selectedTeam } = useNBAEverythingStore();
  const { data: currentTeamSeasonData } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
  });

  const isXS = useMediaQuery({ maxWidth: 480 });
  const isSM = useMediaQuery({ maxWidth: 640 });
  const isMD = useMediaQuery({ maxWidth: 768 });
  const isLG = useMediaQuery({ maxWidth: 1024 });
  const isXL = useMediaQuery({ maxWidth: 1280 });

  const gameData = currentTeamSeasonData?.gameData;
  const columnCount = isXS || isSM ? 1 : isMD || isLG ? 2 : 3;
  const rowCount = gameData?.length ? Math.ceil(gameData?.length / (columnCount * 1.33)) : 0;

  return (
    <div className='col-span-full md:col-span-9 lg:col-span-10'>
      <h2 className='text-2xl'>Game Scores</h2>
      <NBAEverythingTeamGamesGrid
        columnCount={columnCount}
        columnWidth={isXS ? 350 : isSM ? 480 : isMD ? 330 : isLG ? 160 : 145}
        height={400}
        rowCount={rowCount}
        rowHeight={140}
        style={{ backgroundColor: '#f0f0f0', width: '100%' }}
        width={1000}
      >
        {NBAEverythingTeamGame}
      </NBAEverythingTeamGamesGrid>
    </div>
  );
}
