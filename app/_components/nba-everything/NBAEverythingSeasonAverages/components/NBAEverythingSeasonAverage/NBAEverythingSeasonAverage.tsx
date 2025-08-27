'use client';
import classNames from 'classnames';
import { useNBAEverythingStore } from '@/store';
import { getTeamModeSecondaryColor } from '@/helpers';

type NBASeasonAverageProps = {
  statValue?: string;
  statTitle: string;
};

export default function NBASeasonAverage({ statValue, statTitle }: NBASeasonAverageProps) {
  const { selectedMode, selectedTeam } = useNBAEverythingStore();
  return (
    statValue &&
    statTitle && (
      <div
        className={classNames('flex flex-col', {
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
        <p className='text-xl'>{statTitle}</p>
        <p className='text-sm'>{statValue}</p>
      </div>
    )
  );
}
