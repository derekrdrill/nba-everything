'use client';
import NBAEverythingGame from '@app/game/[gameId]/components';
import { Overlay } from '@app/components';

export default function GameIndex() {
  return (
    <>
      <Overlay />
      <NBAEverythingGame />
    </>
  );
}
