import classNames from 'classnames';
import { useNBAEverythingAtoms } from '@/store';
import { NBAEverythingGameTeamStatLeaders } from '@/app/game/[gameId]/components';
import { useNBAEverythingClient } from '@/app/_hooks';

export default function NBAEverythingGameStatLeaders() {
  const { selectedTeamStats } = useNBAEverythingAtoms();

  const { currentGameStats } = useNBAEverythingClient({
    shouldReturnGameStats: true,
  });

  const homeStatLeaders = currentGameStats?.homeTeam.statLeaders;
  const visitorStatLeaders = currentGameStats?.visitorTeam.statLeaders;

  return (
    <div className='flex flex-col gap-4 mx-auto md:mx-16'>
      <h2 className='text-2xl text-center'>Stat Leaders</h2>
      <div className='flex justify-center lg:justify-between'>
        <NBAEverythingGameTeamStatLeaders
          containerStyles={classNames({
            hidden: selectedTeamStats === 1,
          })}
          homeOrVisitor='visitor'
          statLeaders={visitorStatLeaders}
        />
        <NBAEverythingGameTeamStatLeaders
          containerStyles={classNames({
            hidden: selectedTeamStats === 0,
          })}
          homeOrVisitor='home'
          statLeaders={homeStatLeaders}
        />
      </div>
    </div>
  );
}
