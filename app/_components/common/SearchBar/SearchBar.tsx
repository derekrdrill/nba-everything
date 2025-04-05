'use client';

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import { useNBAEverythingState } from '@/store';
import { getTeamModeSecondaryColor, getTeamModeSearchBarTextColor } from '@/helpers';

interface SearchBarProps {
  handleOptionSelect?: (value: string) => void;
  isDisabled?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
  rounded?: 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg';
  value?: string;
}

export default function SearchBar({
  handleOptionSelect,
  isDisabled,
  options,
  rounded = 'md',
  size = 'md',
  value,
}: SearchBarProps) {
  const hasOptionsLoaded = !!options?.length;
  const searchBarContainerRef = useRef<HTMLDivElement>(null);
  const [searchBarWidth, setSearchBarWidth] = useState<number | undefined>(undefined);
  const { selectedMode, selectedTeam } = useNBAEverythingState();

  useEffect(() => {
    const handleResize = () => {
      setSearchBarWidth(searchBarContainerRef?.current?.clientWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSearchBarWidth(searchBarContainerRef?.current?.clientWidth);
  }, [searchBarContainerRef?.current?.clientWidth]);

  return (
    <div className='w-full' ref={searchBarContainerRef}>
      <Listbox disabled={isDisabled} onChange={handleOptionSelect} value={value}>
        <ListboxButton
          className={classNames('border cursor-pointer w-full', {
            'bg-gray-300 cursor-not-allowed pointer-events-none text-gray-500': isDisabled,
            'h-10': size === 'sm',
            'h-12': size === 'md',
            'h-14': size === 'lg',
            'rounded-md': rounded === 'sm',
            'rounded-lg': rounded === 'md',
            'rounded-xl': rounded === 'lg',
            'bg-gray-200': selectedMode === 'light',
            'bg-gray-700 border-gray-600': selectedMode === 'dark',
            'text-white': selectedMode === 'dark',
            'border-gray-400 hover:border-gray-600': selectedMode === 'light',
            'hover:border-gray-400': selectedMode === 'dark',
          })}
          disabled={isDisabled}
          style={{
            backgroundColor:
              selectedMode === 'team' && !isDisabled
                ? `#${getTeamModeSecondaryColor({
                    primaryColor: selectedTeam?.colors.primary,
                    secondaryColor: selectedTeam?.colors.secondary,
                  })}`
                : undefined,
            border:
              selectedMode === 'team' && !isDisabled
                ? `2px solid #${selectedTeam?.colors.tertiary || 'white'}`
                : undefined,
            color:
              selectedMode === 'team' && !isDisabled
                ? `#${getTeamModeSearchBarTextColor({ primaryColor: selectedTeam?.colors.primary, secondaryColor: selectedTeam?.colors.secondary })}`
                : undefined,
          }}
        >
          <div className='flex justify-between mx-2'>
            {hasOptionsLoaded ? (
              <>
                {options?.find(option => option.value === value)?.label}
                <ChevronDownIcon className='h-5 w-5 text-gray-400' />
              </>
            ) : (
              'loading...'
            )}
          </div>
        </ListboxButton>
        <ListboxOptions
          className={classNames('absolute max-h-96 overflow-auto rounded-b-md z-10', {
            border: selectedMode === 'dark' || selectedMode === 'team',
            'bg-white border-2 border-gray-100':
              selectedMode === 'light' || selectedMode === 'team',
            'bg-gray-800 border-gray-600 text-white': selectedMode === 'dark',
          })}
          style={{
            width: searchBarWidth,
          }}
        >
          {options?.map(option => (
            <ListboxOption
              className={classNames('cursor-pointer p-2', {
                'border border-gray-100 hover:bg-blue-300': selectedMode === 'team',
                'border-b-2 border-gray-100 hover:bg-blue-200': selectedMode === 'light',
                'border border-gray-600 hover:bg-purple-200 hover:text-black':
                  selectedMode === 'dark',
              })}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
