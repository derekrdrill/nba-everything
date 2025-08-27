'use client';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

import { useNBAEverythingStore } from '@/app/_store';
import { TeamIcon } from '@/components/common/DarkLightTeamMode/_components';

export default function DarkLightTeamMode() {
  const { selectedMode, setSelectedMode } = useNBAEverythingStore();

  return (
    <TabGroup
      onChange={index => {
        setSelectedMode(index === 0 ? 'light' : index === 1 ? 'dark' : 'team');
      }}
      selectedIndex={selectedMode === 'light' ? 0 : selectedMode === 'dark' ? 1 : 2}
    >
      <TabList className='flex gap-0'>
        <Tab className='tab border-[1px] border-gray-200 py-0.5 p-2 rounded-l-md data-[selected]:bg-blue-200 data-[selected]:border-blue-400'>
          <SunIcon color={selectedMode === 'light' ? 'black' : 'white'} height={20} width={20} />
        </Tab>
        <Tab className='tab border-[1px] border-gray-200 py-0.5 p-2 data-[selected]:bg-blue-200 data-[selected]:border-blue-400'>
          <MoonIcon
            color={selectedMode === 'dark' || selectedMode === 'light' ? 'black' : 'white'}
            height={20}
            width={20}
          />
        </Tab>
        <Tab className='tab border-[1px] border-gray-200 py-0.5 p-2 rounded-r-md data-[selected]:bg-blue-200 data-[selected]:border-blue-400'>
          <TeamIcon
            fill={selectedMode === 'light' || selectedMode === 'team' ? 'black' : 'white'}
          />
        </Tab>
      </TabList>
    </TabGroup>
  );
}
