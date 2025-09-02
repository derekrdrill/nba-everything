import Link from 'next/link';
import classNames from 'classnames';

import { useNBAEverythingStore } from '@/store';
import { NBAEverythingTeamLogo } from '@/components/nba-everything';

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
  const { selectedTeam, selectedMode, currentTeamSeasonData } = useNBAEverythingStore();

  const gameData = currentTeamSeasonData?.gameData;
  const gameIndex = rowIndex;

  const game = gameData?.[gameIndex];
  const gameUrl = game?.id ? `/game/${game?.id}` : '';
  const gameDate = new Date(game?.date ?? '').toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  const isFinal = game?.status === 'Final';
  const isWinAsHome = isFinal && game?.win && game?.home_team?.id === selectedTeam?.id;
  const isWinAsVisitor = isFinal && game?.win && game?.visitor_team?.id === selectedTeam?.id;
  const isLossAsHome = isFinal && !game?.win && game?.home_team?.id === selectedTeam?.id;
  const isLossAsVisitor = isFinal && !game?.win && game?.visitor_team?.id === selectedTeam?.id;

  if (gameData && gameIndex >= gameData?.length) return null;

  return (
    <div
      style={style}
      className={classNames(
        'flex flex-col gap-4 p-2 border-b border-t-0 border-l-0 border-r-0 border-b-gray-700',
        {
          'bg-gray-200': selectedMode !== 'dark',
          'bg-gray-500': selectedMode === 'dark',
        },
      )}
    >
      <div className='flex flex-col gap-2'>
        <div
          className={classNames('flex justify-between', {
            'text-green-500': isWinAsVisitor && selectedMode !== 'dark',
            'text-red-600': isLossAsVisitor && selectedMode !== 'dark',
            'text-green-400': isWinAsVisitor && selectedMode === 'dark',
            'text-red-900': isLossAsVisitor && selectedMode === 'dark',
          })}
        >
          <div className='flex gap-3'>
            <NBAEverythingTeamLogo team={game?.visitor_team} />
            <p>{game?.visitor_team?.abbreviation}</p>
          </div>
          <p>{game?.visitor_team_score}</p>
        </div>
        <div
          className={classNames('flex justify-between', {
            'text-green-500': isWinAsHome && selectedMode !== 'dark',
            'text-red-600': isLossAsHome && selectedMode !== 'dark',
            'text-green-400': isWinAsHome && selectedMode === 'dark',
            'text-red-900': isLossAsHome && selectedMode === 'dark',
          })}
        >
          <div className='flex gap-3'>
            <NBAEverythingTeamLogo team={game?.home_team} />
            <p>{game?.home_team?.abbreviation}</p>
          </div>
          <p>{game?.home_team_score}</p>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <p className='text-tiny'>{gameDate}</p>
          {
            <p
              className={classNames('text-tiny', {
                'font-bold': isFinal,
              })}
            >
              {game?.time}
            </p>
          }
        </div>
      </div>
      <Link href={gameUrl} className='flex text-center text-tiny underline w-full'>
        <span className='text-center text-navy w-full'>Game Detail</span>
      </Link>
    </div>
  );
}
