import classNames from 'classnames';
import { useNBAEverythingStore } from '@store';

type NBAEverythingGameTeamScoreProps = {
  homeOrVisitor: 'home' | 'visitor';
};

export default function NBAEverythingGameTeamScore({
  homeOrVisitor,
}: NBAEverythingGameTeamScoreProps) {
  const { selectedGame, selectedTeam } = useNBAEverythingStore();
  return (
    <p
      className={classNames('text-2xl', {
        'font-bold':
          selectedGame?.win && selectedGame?.[`${homeOrVisitor}_team`].id === selectedTeam?.id,
      })}
    >
      {selectedGame?.[`${homeOrVisitor}_team_score`]}
    </p>
  );
}
