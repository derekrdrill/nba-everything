import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNBAEverythingStore } from '@store';
import { NBAEverythingGamesTeamAvgs } from '@nba-everything/components/NBAEverythingGames/components';

const getGamesByTeamAndSeason = async ({
  selectedSeason,
  selectedTeamId,
}: {
  selectedSeason?: number;
  selectedTeamId?: string;
}) => {
  const gamesOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/games/${selectedTeamId}/${selectedSeason?.toString()}`,
  };

  try {
    const response = await axios.request(gamesOptions);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

export default function NBAEverythingGames({}) {
  const { selectedSeason, selectedTeam } = useNBAEverythingStore();
  const { data: gamesData } = useQuery({
    enabled: !!(selectedSeason && selectedTeam),
    queryKey: ['getGamesByTeamAndSeason', selectedSeason, selectedTeam],
    queryFn: () =>
      getGamesByTeamAndSeason({ selectedSeason, selectedTeamId: selectedTeam?.id.toString() }),
  });

  return (
    <div>
      <NBAEverythingGamesTeamAvgs />
    </div>
  );
}
