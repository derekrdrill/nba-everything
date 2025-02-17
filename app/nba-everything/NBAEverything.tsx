'use client';

import queryClient from '@client/queryClient';
import { QueryClientProvider as NBAEverythingClientProvider } from '@tanstack/react-query';
import { NBAEverythingSeasonSearch, NBAEverythingTeamSearch } from '@nba-everything/components';

export default function NBAEverything() {
  return (
    <NBAEverythingClientProvider client={queryClient}>
      <div className='flex flex-col gap-8 justify-between md:flex-row mx-4'>
        <NBAEverythingTeamSearch />
        <NBAEverythingSeasonSearch />
      </div>
    </NBAEverythingClientProvider>
  );
}
