import Link from 'next/link';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamLogo } from '@app/nba-everything/components';
import { NBATeamStats } from '@types';

type NBAEverythingTeamGameProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
};

export default function NBAEverythingTeamGame({
  columnIndex,
  rowIndex,
  style,
}: NBAEverythingTeamGameProps) {
  const { selectedSeason, selectedTeam } = useNBAEverythingStore();
  const { data: currentTeamSeasonData } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
  });

  const gameData = currentTeamSeasonData?.gameData;
  const gameIndex = rowIndex * 4 + columnIndex;

  const game = gameData?.[gameIndex];
  const gameUrl = game?.id ? `/game/${game?.id}` : '';
  const gameDate = new Date(game?.date ?? '').toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  if (gameData && gameIndex >= gameData?.length) return null;

  return (
    <div style={style} className='bg-[#f0f0e0] flex flex-col gap-4 p-2 border'>
      <div className='flex flex-col gap-2'>
        <div
          className={classNames('flex justify-between', {
            'text-green-500': game?.win && game.visitor_team.id === selectedTeam?.id,
            'text-red-500': !game?.win && game?.visitor_team.id === selectedTeam?.id,
          })}
        >
          <div className='flex gap-3'>
            <NBAEverythingTeamLogo team={game?.visitor_team} />
            <p>{game?.visitor_team.abbreviation}</p>
          </div>
          <p>{game?.visitor_team_score}</p>
        </div>
        <div
          className={classNames('flex justify-between', {
            'text-green-500': game?.win && game?.home_team.id === selectedTeam?.id,
            'text-red-500': !game?.win && game?.home_team.id === selectedTeam?.id,
          })}
        >
          <div className='flex gap-3'>
            <NBAEverythingTeamLogo team={game?.home_team} />
            <p>{game?.home_team.abbreviation}</p>
          </div>
          <p>{game?.home_team_score}</p>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <p className='text-tiny'>{gameDate}</p>
          {game?.status === 'Final' && <p className='text-tiny'>{game?.status}</p>}
        </div>
      </div>
      <Link href={gameUrl} className='flex text-center text-tiny underline w-full'>
        <span className='text-center text-navy w-full'>Game Detail</span>
      </Link>
    </div>
  );
}
