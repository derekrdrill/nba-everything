'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { ShimmerDiv } from 'shimmer-effects-react';

import {
  NBAEverythingSeasonAverages,
  NBAEverythingSeasonSearch,
  NBAEverythingTeamGames,
  NBAEverythingTeamSearch,
} from '@nba-everything/components';
import { useNBAEverythingStore } from '@store';
import { NBATeamStats, NBATeam } from '@types';

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

export default function NBAEverything() {
  const { selectedTeam, selectedSeason } = useNBAEverythingStore();

  useQuery<NBATeam[]>({
    queryKey: ['getCurrentTeams'],
    queryFn: getCurrentTeams,
  });

  const { isPending: isCurrentTeamSeasonAvgsPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id],
    queryFn: () => getTeamSeasonData({ season: selectedSeason, teamId: selectedTeam?.id }),
  });

  return (
    <div className='flex flex-col gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
      <div className='flex flex-col gap-8 justify-between md:flex-row'>
        <NBAEverythingTeamSearch />
        <NBAEverythingSeasonSearch />
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <div className='col-span-full md:col-span-1'>
          <h2>Team info</h2>
        </div>
        <div className='col-span-full md:col-span-1'>
          {isCurrentTeamSeasonAvgsPending && (
            <div className='flex gap-8'>
              <ShimmerDiv height={400} loading mode='light' width={'18%'} />
              <ShimmerDiv height={400} loading mode='light' width={'82%'} />
            </div>
          )}
          {!isCurrentTeamSeasonAvgsPending && (
            <div className='grid grid-cols-12 gap-8'>
              <NBAEverythingSeasonAverages />
              <NBAEverythingTeamGames />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
