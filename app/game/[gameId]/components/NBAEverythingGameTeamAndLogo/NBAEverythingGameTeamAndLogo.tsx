import classNames from 'classnames';
import { useNBAEverythingAtoms } from '@/store';
import { NBAEverythingTeamLogo } from '@/components/nba-everything';

type NBAEverythingGameTeamAndLogoProps = {
  homeOrVisitor: 'home' | 'visitor';
  styles?: string;
};

export default function NBAEverythingGameTeamAndLogo({
  homeOrVisitor,
  styles,
}: NBAEverythingGameTeamAndLogoProps) {
  const { selectedGame } = useNBAEverythingAtoms();

  return (
    <div className={classNames('flex gap-2 items-center md:flex-col', styles)}>
      <NBAEverythingTeamLogo
        height={0}
        imageStyles='h-12 w-12 md:h-24 md:w-24'
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
