'use client';
import { NBAEverythingGameModal } from '@app/game/[gameId]/components';
import { Overlay } from '@app/components';

export default function GameIndex() {
  return (
    <>
      <Overlay />
      <NBAEverythingGameModal />
    </>
  );
}
