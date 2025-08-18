import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@/store';
import { NBAEverythingBoxScoreGrid } from '@/components/nba-everything';
import { NBABoxScoreShort, NBAGameStats, NBAGameBoxScoreShort } from '@/types';
import { getGameStats } from '../../api/get';

const getStatRows = ({
  boxScoreData,
}: {
  boxScoreData?: NBAGameBoxScoreShort[];
}): NBABoxScoreShort[] | undefined => {
  return boxScoreData?.map(boxScoreData => ({
    ...boxScoreData,
    ...{
      'fg%': `${boxScoreData.fg_pct}%`,
      '3p%': `${boxScoreData.fg3_pct}%`,
      to: boxScoreData.turnover,
    },
  }));
};

export default function NBAEverythingGameBoxScore() {
  const { selectedGame, selectedTeamStats } = useNBAEverythingStore();

  const { data: nbaGameStats } = useQuery<{
    homeTeam: NBAGameStats;
    visitorTeam: NBAGameStats;
  }>({
    queryKey: ['getGameStats', selectedGame?.id],
    queryFn: () => getGameStats({ gameId: selectedGame?.id }),
    enabled: !!selectedGame?.id,
  });

  return (
    <div>
      <h2 className='text-2xl text-center w-full'>Box Score</h2>
      <div className='flex gap-16 justify-between pb-0.5 sm:pb-0'>
        <NBAEverythingBoxScoreGrid
          containerStyles={classNames('h-[30vh] w-full lg:w-1/2 lg:block', {
            hidden: selectedTeamStats === 1,
          })}
          rowData={getStatRows({ boxScoreData: nbaGameStats?.visitorTeam.boxScoreDataShort })}
        />
        <NBAEverythingBoxScoreGrid
          containerStyles={classNames('h-[30vh] w-full lg:w-1/2 lg:block', {
            hidden: selectedTeamStats === 0,
          })}
          rowData={getStatRows({ boxScoreData: nbaGameStats?.homeTeam.boxScoreDataShort })}
        />
      </div>
    </div>
  );
}
