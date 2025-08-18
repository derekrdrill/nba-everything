'use client';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useMediaQuery } from 'react-responsive';
import { FixedSizeList } from 'react-window';
import { useRef, useEffect, useState, useCallback } from 'react';

import { getTeamSeasonData } from '@/api/get';
import { useNBAEverythingStore } from '@/store';
import { NBAEverythingTeamGame } from '@/components/nba-everything/NBAEverythingTeamGames/components';
import { getTeamModeSecondaryColor } from '@/app/_helpers';
import { NBATeamStats } from '@/types';

export default function NBAEverythingTeamGames() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const {
    selectedSeason,
    selectedTeam,
    selectedMode,
    currentTeamSeasonData,
    nextCursor,
    setCurrentTeamSeasonData,
    appendCurrentTeamSeasonData,
    setNextCursor,
  } = useNBAEverythingStore();

  const { data: teamSeasonData, isPending } = useQuery<NBATeamStats>({
    enabled: !!(selectedTeam?.id && selectedSeason),
    queryKey: ['getTeamSeasonData', selectedSeason, selectedTeam?.id, nextCursor],
    queryFn: () =>
      getTeamSeasonData({
        season: selectedSeason,
        teamId: selectedTeam?.id,
        cursor: nextCursor,
      }),
  });

  useEffect(() => {
    setNextCursor(undefined);
  }, [selectedTeam]);

  useEffect(() => {
    if (teamSeasonData) {
      if (nextCursor) {
        appendCurrentTeamSeasonData(teamSeasonData);
      } else {
        setCurrentTeamSeasonData(teamSeasonData);
      }
    }
  }, [teamSeasonData]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleScroll = useCallback(
    ({
      visibleStopIndex,
      visibleStartIndex,
    }: {
      visibleStopIndex: number;
      visibleStartIndex: number;
    }) => {
      if (!currentTeamSeasonData?.gameData) return;

      const totalItems = currentTeamSeasonData.gameData.length;
      const visibleItems = visibleStopIndex - visibleStartIndex + 1;
      const isNearBottom = visibleStopIndex >= totalItems - visibleItems;

      if (isNearBottom && teamSeasonData?.pagination?.nextCursor) {
        setNextCursor(teamSeasonData.pagination.nextCursor);
      }
    },
    [currentTeamSeasonData?.gameData, teamSeasonData?.pagination?.nextCursor],
  );

  const gameData = currentTeamSeasonData?.gameData;
  const totalItems = (gameData?.length || 0) + (isPending ? 1 : 0);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    if (index === gameData?.length) {
      return (
        <div style={style} className='flex items-center justify-center bg-[#f0f0e0] p-4 border'>
          <div className='animate-pulse flex items-center gap-2'>
            <div className='h-4 w-4 bg-gray-300 rounded-full'></div>
            <div className='h-4 w-24 bg-gray-300 rounded'></div>
          </div>
        </div>
      );
    }
    return <NBAEverythingTeamGame columnIndex={0} rowIndex={index} style={style} />;
  };

  return (
    <div ref={containerRef} className='col-span-full lg:col-span-10'>
      <h2
        className={classNames('text-2xl', {
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
        Game Scores
      </h2>
      {containerWidth > 0 && (
        <FixedSizeList
          height={400}
          itemCount={totalItems}
          itemSize={140}
          width={containerWidth}
          style={{ backgroundColor: '#f0f0f0' }}
          onItemsRendered={handleScroll}
        >
          {Row}
        </FixedSizeList>
      )}
    </div>
  );
}
