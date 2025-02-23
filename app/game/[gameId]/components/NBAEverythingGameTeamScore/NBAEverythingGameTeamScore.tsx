import classNames from 'classnames';
import { useNBAEverythingStore } from '@store';
import { isHomeWin, isVisitorWin } from '@app/game/[gameId]/helpers';

type NBAEverythingGameTeamScoreProps = {
  homeOrVisitor: 'home' | 'visitor';
};

export default function NBAEverythingGameTeamScore({
  homeOrVisitor,
}: NBAEverythingGameTeamScoreProps) {
  const { selectedGame } = useNBAEverythingStore();

  const homeTeamScore = selectedGame?.home_team_score;
  const visitorTeamScore = selectedGame?.visitor_team_score;

  const isWin =
    isHomeWin({ homeOrVisitor, homeTeamScore, visitorTeamScore }) ||
    isVisitorWin({ homeOrVisitor, homeTeamScore, visitorTeamScore });

  return (
    <p
      className={classNames('text-2xl', {
        'font-bold': isWin,
      })}
    >
      {selectedGame?.[`${homeOrVisitor}_team_score`]}
    </p>
  );
}
