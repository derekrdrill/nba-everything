import { ArrowLeftIcon, ArrowRightIcon } from '@node_modules/@heroicons/react/20/solid';

import { useNBAEverythingStore } from '@store';
import { isHomeWin, isVisitorWin } from '@app/game/[gameId]/helpers';

export default function NBAEverythingGameFinal() {
  const { selectedGame } = useNBAEverythingStore();

  const homeTeamScore = selectedGame?.home_team_score;
  const visitorTeamScore = selectedGame?.visitor_team_score;
  const isHomeWin2 = isHomeWin({ homeOrVisitor: 'home', homeTeamScore, visitorTeamScore });
  const isVisitorWin2 = isVisitorWin({ homeOrVisitor: 'visitor', homeTeamScore, visitorTeamScore });

  return (
    <div className='flex gap-3'>
      <div className='h-6 w-6'>{isVisitorWin2 && <ArrowLeftIcon className='h-full w-full' />}</div>
      <p className='font-bold text-lg'>Final</p>
      <div className='h-6 w-6'>{isHomeWin2 && <ArrowRightIcon className='h-full w-full' />}</div>
    </div>
  );
}
