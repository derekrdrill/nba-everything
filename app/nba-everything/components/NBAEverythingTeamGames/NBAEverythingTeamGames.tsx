import classNames from 'classnames';
import { FixedSizeGrid as NBAEverythingTeamGamesGrid } from 'react-window';
import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamGame } from '@nba-everything/components/NBAEverythingTeamGames/components';
import { NBATeamStats } from '@types';

export default function NBAEverythingTeamGames() {
  const { selectedSeason, selectedTeam } = useNBAEverythingStore();
  const { data: currentTeamSeasonData } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
  });

  const gameData = currentTeamSeasonData?.gameData;
  const columnCount = 3;
  const rowCount = gameData?.length ? Math.ceil(gameData?.length / (columnCount * 1.33)) : 0;

  return (
    <div className='col-span-full md:col-span-9 lg:col-span-10'>
      <h2 className='text-2xl'>Game Scores</h2>
      <NBAEverythingTeamGamesGrid
        columnCount={columnCount}
        columnWidth={145}
        height={400}
        rowCount={rowCount}
        rowHeight={140}
        style={{ backgroundColor: '#f0f0f0' }}
        width={450}
      >
        {NBAEverythingTeamGame}
      </NBAEverythingTeamGamesGrid>
    </div>
  );
}
