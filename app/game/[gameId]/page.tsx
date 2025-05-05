'use client';
import NBAEverythingGame from '@/app/game/[gameId]/components';
import { Overlay } from '@/components/common';

export default function GameIndex() {
  return (
    <>
      <Overlay />
      <NBAEverythingGame />
    </>
  );
}
