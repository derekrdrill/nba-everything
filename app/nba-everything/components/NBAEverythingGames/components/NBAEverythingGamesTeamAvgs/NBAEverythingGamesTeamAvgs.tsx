import { useQueryClient } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@store';
import { NBATeamStats } from '@types';
import { NBAEverythingGamesTeamStat } from '@nba-everything/components/NBAEverythingGames/components';

type NBAEverythingGamesTeamAvgsProps = {};

export default function NBAEverythingGamesTeamAvgs({}: NBAEverythingGamesTeamAvgsProps) {
  const client = useQueryClient();
  const { selectedSeason, selectedTeam } = useNBAEverythingStore();

  const gamesDataState = client.getQueryState([
    'getGamesByTeamAndSeason',
    selectedSeason,
    selectedTeam,
  ]);

  const gamesData = gamesDataState?.data as NBATeamStats;

  return (
    <div className='flex flex-col'>
      <NBAEverythingGamesTeamStat
        stat={`${gamesData?.wins}-${gamesData?.losses}`}
        statLabel='W-L'
      />
      <NBAEverythingGamesTeamStat stat={gamesData?.ppg.toFixed(2)} statLabel='PPG' />
      <NBAEverythingGamesTeamStat stat={gamesData?.rpg.toFixed(2)} statLabel='RPG' />
      <NBAEverythingGamesTeamStat stat={gamesData?.apg.toFixed(2)} statLabel='APG' />
      <NBAEverythingGamesTeamStat stat={gamesData?.spg.toFixed(2)} statLabel='SPG' />
      <NBAEverythingGamesTeamStat stat={gamesData?.bpg.toFixed(2)} statLabel='BPG' />
    </div>
  );
}
