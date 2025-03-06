import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from '@node_modules/@heroicons/react/20/solid';

import { useNBAEverythingStore } from '@store';
import { isHomeWin, isVisitorWin } from '@app/game/[gameId]/helpers';

type NBAEverythingGameStatusProps = {
  styles?: string;
};

export default function NBAEverythingGameStatus({ styles }: NBAEverythingGameStatusProps) {
  const { selectedGame } = useNBAEverythingStore();

  const homeTeamScore = selectedGame?.home_team_score;
  const visitorTeamScore = selectedGame?.visitor_team_score;
  const isHomeWin2 = isHomeWin({ homeOrVisitor: 'home', homeTeamScore, visitorTeamScore });
  const isVisitorWin2 = isVisitorWin({ homeOrVisitor: 'visitor', homeTeamScore, visitorTeamScore });
  const isFinal = selectedGame?.time === 'Final';

  return (
    <div className={classNames('flex gap-3 justify-end md:justify-start', styles)}>
      <div className='hidden h-6 w-6 md:block'>
        {isVisitorWin2 && isFinal && <ArrowLeftIcon className='h-full w-full' />}
      </div>
      <p className='font-bold text-lg'>{selectedGame?.time}</p>
      <div className='hidden h-6 w-6 md:block'>
        {isHomeWin2 && isFinal && <ArrowRightIcon className='h-full w-full' />}
      </div>
    </div>
  );
}
