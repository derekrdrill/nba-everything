import React from 'react';
import Image from 'next/image';
import nbaLogo from '@public/nba.png';

export default function Header() {
  return (
    <div className='flex items-end mx-4'>
      <Image alt='NBA Logo' className='h-32 w-32' src={nbaLogo}></Image>
      <p className='text-3xl -translate-y-5'>everything...</p>
    </div>
  );
}
