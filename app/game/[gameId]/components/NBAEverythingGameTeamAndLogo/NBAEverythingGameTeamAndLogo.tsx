import classNames from 'classnames';
import { useNBAEverythingStore } from '@/store';
import { NBAEverythingTeamLogo } from '@/components/nba-everything';

type NBAEverythingGameTeamAndLogoProps = {
  homeOrVisitor: 'home' | 'visitor';
  styles?: string;
};

export default function NBAEverythingGameTeamAndLogo({
  homeOrVisitor,
  styles,
}: NBAEverythingGameTeamAndLogoProps) {
  const { selectedGame, selectedMode } = useNBAEverythingStore();

  return (
    <div
      className={classNames('flex gap-0 items-center md:flex-col md:mb-2', styles, {
        'gap-2': selectedMode !== 'dark',
      })}
    >
      <NBAEverythingTeamLogo
        height={0}
        imageStyles={classNames('h-12 w-12 md:h-24 md:w-24', {
          'bg-gray-700 p-1 rounded md:py-3 md:px-5': selectedMode === 'dark',
        })}
        team={selectedGame?.[`${homeOrVisitor}_team`]}
        width={0}
      />
      <h2
        className={classNames('h-12 pt-2 text-lg text-center w-12 md:pt-0 md:h-auto md:w-24', {})}
      >
        {selectedGame?.[`${homeOrVisitor}_team`]?.abbreviation}
      </h2>
    </div>
  );
}
