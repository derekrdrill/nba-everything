import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@/store';
import { getPlayerStatsByTeamAndSeason } from '@/api/get';
import { getTeamModeSecondaryColor } from '@/app/_helpers';
import { NBAPlayerStat } from '@/app/_types';
import { NBAEverythingBoxScoreGrid } from '@/components/nba-everything';

type NBAEverythingPlayerSeasonStatsProps = {};

function NBAEverythingPlayerSeasonStats({}: NBAEverythingPlayerSeasonStatsProps) {
  const { selectedSeason, selectedTeam, selectedMode } = useNBAEverythingStore();

  const { data: nbaPlayerStats, isPending: isNBAPlayerStatsPending } = useQuery<{
    data: NBAPlayerStat[];
  }>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getPlayerStatsByTeamAndSeason', selectedTeam?.id, selectedSeason],
    queryFn: () =>
      getPlayerStatsByTeamAndSeason({ teamId: selectedTeam?.id, season: selectedSeason }),
  });

  return (
    <>
      <h2
        className={classNames('text-2xl text-center', {
          'text-white': selectedMode === 'dark',
        })}
        style={{
          color:
            selectedMode === 'team'
              ? `#${getTeamModeSecondaryColor({
                  primaryColor: selectedTeam?.colors.primary,
                  secondaryColor: selectedTeam?.colors.secondary,
                })}`
              : '',
        }}
      >
        Player Season Stats
      </h2>
      <NBAEverythingBoxScoreGrid
        containerStyles='h-96'
        isLoading={isNBAPlayerStatsPending}
        isPlayerSeasonStats
        rowData={nbaPlayerStats?.data}
        rowHeight={28}
      />
    </>
  );
}

export default NBAEverythingPlayerSeasonStats;
