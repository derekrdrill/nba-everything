import React from 'react';

type Props = {};

export default function Overlay({}: Props) {
  return (
    <div className='absolute bg-blue-400 h-full opacity-20 overscroll-none top-0 w-full z-0' />
  );
}
