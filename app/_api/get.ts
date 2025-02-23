import axios from 'axios';
import { NBATeam } from '@types';

const getTeamSeasonData = async ({ season, teamId }: { season?: number; teamId?: number }) => {
  const seasonAveragesOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/games/${teamId}/${season}`,
  };

  try {
    const response = await axios.request(seasonAveragesOptions);

    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

const getCurrentTeams = async (): Promise<NBATeam[]> => {
  const teamOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/teams/current`,
  };

  try {
    const response = await axios.request(teamOptions);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

export { getTeamSeasonData, getCurrentTeams };
