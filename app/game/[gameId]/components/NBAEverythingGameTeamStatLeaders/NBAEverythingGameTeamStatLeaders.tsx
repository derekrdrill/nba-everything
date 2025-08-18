import classNames from 'classnames';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { NBAGameStat } from '@/types';

type GameModalTeamStatLeadersProps = {
  containerStyles?: string;
  homeOrVisitor: 'home' | 'visitor';
  statLeaders?: NBAGameStat[];
};

export default function NBAEverythingGameTeamStatLeaders({
  containerStyles,
  homeOrVisitor,
  statLeaders,
}: GameModalTeamStatLeadersProps) {
  const isHome = homeOrVisitor === 'home';
  const isVisitor = homeOrVisitor === 'visitor';

  return (
    <div
      className={classNames('flex flex-col justify-between lg:block', containerStyles, {
        'lg:justify-end': isHome,
        'lg:justify-start': isVisitor,
      })}
    >
      {statLeaders?.map(statLeader => (
        <p
          key={`home-leader-${statLeader.type}`}
          className='flex gap-2 items-center justify-between'
        >
          <span
            className={classNames({
              'lg:order-1': isHome,
              'lg:order-4': isVisitor,
            })}
          >
            {statLeader.player.head_shot ? (
              <img
                className='flex rounded-md'
                src={statLeader.player.head_shot}
                height={48}
                width={48}
              />
            ) : (
              <UserCircleIcon height={48} width={48} />
            )}
          </span>
          <span
            className={classNames('flex order-1', {
              'lg:order-2': isHome,
              'lg:order-3': isVisitor,
            })}
          >
            {`${statLeader.player.first_name[0]}. 
              ${statLeader.player.proper_last_name ?? statLeader.player.last_name}`}
          </span>
          <span
            className={classNames('font-bold order-3', {
              'lg:order-1': isVisitor,
              'lg:order-4': isHome,
            })}
          >
            {statLeader.total}{' '}
            {`${statLeader.type === 'turnover' ? 'to' : `${statLeader['type']}`}`.toUpperCase()}
          </span>
        </p>
      ))}
    </div>
  );
}
