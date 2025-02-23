import classNames from 'classnames';
import { NBAGameStat } from '@types';

type GameModalTeamStatLeadersProps = {
  homeOrVisitor: 'home' | 'visitor';
  statLeaders?: NBAGameStat[];
};

export default function NBAEverythingGameTeamStatLeaders({
  homeOrVisitor,
  statLeaders,
}: GameModalTeamStatLeadersProps) {
  return (
    <div
      className={classNames('flex flex-col', {
        'justify-end': homeOrVisitor === 'home',
      })}
    >
      {statLeaders?.map(statLeader => (
        <p
          key={`home-leader-${statLeader.type}`}
          className={classNames('flex gap-2', {
            'justify-end': homeOrVisitor === 'home',
          })}
        >
          <span
            className={classNames('font-bold', {
              'order-1': homeOrVisitor === 'visitor',
              'order-3': homeOrVisitor === 'home',
            })}
          >
            {statLeader.total}{' '}
            {`${statLeader.type === 'turnover' ? 'to' : `${statLeader['type']}`}`.toUpperCase()}
          </span>
          <span className='order-2'> - </span>
          <span
            className={classNames({
              'order-1': homeOrVisitor === 'home',
              'order-3': homeOrVisitor === 'visitor',
            })}
          >{`${statLeader.player.first_name[0]}. ${statLeader.player.last_name}`}</span>
        </p>
      ))}
    </div>
  );
}
