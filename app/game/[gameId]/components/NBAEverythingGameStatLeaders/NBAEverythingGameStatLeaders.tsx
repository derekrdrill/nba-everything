import { useQuery } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@store';
import { NBAEverythingGameTeamStatLeaders } from '@app/game/[gameId]/components';
import { NBAGameStats } from '@types';

export default function NBAEverythingGameStatLeaders() {
  const { selectedGame } = useNBAEverythingStore();

  const { data: nbaGameStats } = useQuery<{
    homeTeam: NBAGameStats;
    visitorTeam: NBAGameStats;
  }>({
    queryKey: ['getGameStats', selectedGame?.id],
  });

  const homeStatLeaders = nbaGameStats?.homeTeam.statLeaders;
  const visitorStatLeaders = nbaGameStats?.visitorTeam.statLeaders;

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl text-center'>Stat Leaders</h2>
      <div className='flex justify-between'>
        <NBAEverythingGameTeamStatLeaders
          homeOrVisitor='visitor'
          statLeaders={visitorStatLeaders}
        />
        <NBAEverythingGameTeamStatLeaders homeOrVisitor='home' statLeaders={homeStatLeaders} />
      </div>
    </div>
  );
}
