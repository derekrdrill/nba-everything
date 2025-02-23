import { useNBAEverythingStore } from '@store';
import { NBAEverythingTeamLogo } from '@app/nba-everything/components';

type NBAEverythingGameTeamAndLogoProps = {
  homeOrVisitor: 'home' | 'visitor';
};

export default function NBAEverythingGameTeamAndLogo({
  homeOrVisitor,
}: NBAEverythingGameTeamAndLogoProps) {
  const { selectedGame } = useNBAEverythingStore();

  return (
    <div className='flex flex-col gap-2'>
      <NBAEverythingTeamLogo
        height={75}
        team={selectedGame?.[`${homeOrVisitor}_team`]}
        width={75}
      />
      <h2 className='text-lg text-right'>
        {selectedGame?.[`${homeOrVisitor}_team`]?.abbreviation}
      </h2>
    </div>
  );
}
