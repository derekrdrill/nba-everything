import classNames from 'classnames';

import { useNBAEverythingAtoms } from '@/store';
import { NBAEverythingBoxScoreGrid } from '@/components/nba-everything';
import { NBABoxScoreShort, NBAGameBoxScoreShort } from '@/types';
import { useNBAEverythingClient } from '@/app/_hooks';

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
  const { selectedTeamStats } = useNBAEverythingAtoms();
  const { currentGameStats } = useNBAEverythingClient({
    shouldReturnGameStats: true,
  });

  return (
    <>
      <h2 className='text-2xl text-center sticky top-0 z-50 w-full'>Box Score</h2>
      <div className='flex gap-16 justify-between pb-16 sm:pb-0'>
        <NBAEverythingBoxScoreGrid
          containerStyles={classNames('h-[260px] w-full lg:w-1/2 lg:block', {
            hidden: selectedTeamStats === 1,
          })}
          rowData={getStatRows({ boxScoreData: currentGameStats?.visitorTeam.boxScoreDataShort })}
        />
        <NBAEverythingBoxScoreGrid
          containerStyles={classNames('h-[260px] w-full lg:w-1/2 lg:block', {
            hidden: selectedTeamStats === 0,
          })}
          rowData={getStatRows({ boxScoreData: currentGameStats?.homeTeam.boxScoreDataShort })}
        />
      </div>
    </>
  );
}
