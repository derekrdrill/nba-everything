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
    <div className={classNames('flex gap-2 md:flex-col', styles)}>
      <NBAEverythingTeamLogo
        height={0}
        imageStyles='h-8 w-8 md:h-16 md:w-16'
        team={selectedGame?.[`${homeOrVisitor}_team`]}
        width={0}
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
