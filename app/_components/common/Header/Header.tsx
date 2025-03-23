import React from 'react';
import Image from 'next/image';
import nbaLogo from '@public/nba.png';

import { DarkLightTeamMode } from '@components/common';

export default function Header() {
  return (
    <div className='flex items-center justify-between mx-4'>
      <div className='flex items-end'>
        <Image alt='NBA Logo' className='h-32 w-32' src={nbaLogo}></Image>
        <p className='header-text text-3xl -translate-y-5'>everything...</p>
      </div>
      <DarkLightTeamMode />
    </div>
  );
}
