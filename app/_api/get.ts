import axios from 'axios';
import { NBATeam } from '@/types';

const getTeamSeasonData = async ({
  season,
  teamId,
  cursor,
}: {
  season?: number;
  teamId?: number;
  cursor?: number;
}) => {
  const seasonAveragesOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/games/${teamId}/${season}${cursor ? `?cursor=${cursor}` : ''}`,
  };

  try {
    const response = await axios.request(seasonAveragesOptions);
    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch team season data');
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

const getSeasons = async (): Promise<{ label: string; value: string }[]> => {
  const seasonOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/seasons`,
  };

  try {
    const response = await axios.request(seasonOptions);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch seasons');
  }
};

export { getTeamSeasonData, getCurrentTeams, getSeasons };
