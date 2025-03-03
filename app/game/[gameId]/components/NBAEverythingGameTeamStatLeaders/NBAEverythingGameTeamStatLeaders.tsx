import classNames from 'classnames';
import { NBAGameStat } from '@types';

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
  return (
    <div
      className={classNames('flex flex-col justify-center lg:block', containerStyles, {
        'lg:justify-end': homeOrVisitor === 'home',
        'lg:justify-start': homeOrVisitor === 'visitor',
      })}
    >
      {statLeaders?.map(statLeader => (
        <p
          key={`home-leader-${statLeader.type}`}
          className={classNames('flex gap-2 justify-center', {
            'lg:justify-end': homeOrVisitor === 'home',
            'lg:justify-start': homeOrVisitor === 'visitor',
          })}
        >
          <span
            className={classNames('order-1', {
              'lg:order-1': homeOrVisitor === 'home',
              'lg:order-3': homeOrVisitor === 'visitor',
            })}
          >{`${statLeader.player.first_name[0]}. ${statLeader.player.last_name}`}</span>
          <span className='order-2'> - </span>
          <span
            className={classNames('font-bold order-3', {
              'lg:order-1': homeOrVisitor === 'visitor',
              'lg:order-3': homeOrVisitor === 'home',
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
