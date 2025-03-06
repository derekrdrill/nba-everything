import classNames from 'classnames';
import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamLogo } from '@components/nba-everything';

type NBAEverythingGameTeamAndLogoProps = {
  homeOrVisitor: 'home' | 'visitor';
  styles?: string;
};

export default function NBAEverythingGameTeamAndLogo({
  homeOrVisitor,
  styles,
}: NBAEverythingGameTeamAndLogoProps) {
  const { selectedGame } = useNBAEverythingStore();

  return (
    <div className={classNames('flex flex-col gap-2', styles)}>
      <NBAEverythingTeamLogo
        height={75}
        team={selectedGame?.[`${homeOrVisitor}_team`]}
        width={75}
      />
      <h2
        className={classNames('text-lg text-center', {
          'md:text-right': homeOrVisitor === 'home',
          'md:text-left': homeOrVisitor !== 'home',
        })}
      >
        {selectedGame?.[`${homeOrVisitor}_team`]?.abbreviation}
      </h2>
    </div>
  );
}
