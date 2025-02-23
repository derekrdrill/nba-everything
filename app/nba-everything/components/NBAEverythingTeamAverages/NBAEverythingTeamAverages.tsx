import { useQueryClient } from '@tanstack/react-query';

import { useNBAEverythingStore } from '@store';
import { NBAEverythingStat } from '@nba-everything/components';
import { NBATeamStats } from '@types';

export default function NBAEverythingTeamAverages() {
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
      <NBAEverythingStat stat={`${gamesData?.wins}-${gamesData?.losses}`} statLabel='W-L' />
      <NBAEverythingStat stat={gamesData?.ppg.toFixed(2)} statLabel='PPG' />
      <NBAEverythingStat stat={gamesData?.rpg.toFixed(2)} statLabel='RPG' />
      <NBAEverythingStat stat={gamesData?.apg.toFixed(2)} statLabel='APG' />
      <NBAEverythingStat stat={gamesData?.spg.toFixed(2)} statLabel='SPG' />
      <NBAEverythingStat stat={gamesData?.bpg.toFixed(2)} statLabel='BPG' />
    </div>
  );
}
