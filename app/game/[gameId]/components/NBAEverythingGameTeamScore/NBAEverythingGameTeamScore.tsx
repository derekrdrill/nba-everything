import classNames from 'classnames';
import { useNBAEverythingState } from '@/store';
import { isHomeWin, isVisitorWin } from '@/app/game/[gameId]/helpers';

type NBAEverythingGameTeamScoreProps = {
  homeOrVisitor: 'home' | 'visitor';
  styles?: string;
};

export default function NBAEverythingGameTeamScore({
  homeOrVisitor,
  styles,
}: NBAEverythingGameTeamScoreProps) {
  const { selectedGame } = useNBAEverythingState();

  const homeTeamScore = selectedGame?.home_team_score;
  const visitorTeamScore = selectedGame?.visitor_team_score;

  const isWin =
    isHomeWin({ homeOrVisitor, homeTeamScore, visitorTeamScore }) ||
    isVisitorWin({ homeOrVisitor, homeTeamScore, visitorTeamScore });

  return (
    <p
      className={classNames('text-2xl', styles, {
        'font-bold': isWin,
      })}
    >
      {selectedGame?.[`${homeOrVisitor}_team_score`]}
    </p>
  );
}
