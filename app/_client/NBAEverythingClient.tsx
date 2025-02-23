'use client';

import queryClient from '@queryClient';
import { QueryClientProvider as NBAEverythingClientProvider } from '@tanstack/react-query';

type NBAEverythingLayoutProps = {
  children: React.ReactNode;
};

export default function NBAEverythingClient({ children }: NBAEverythingLayoutProps) {
  return <NBAEverythingClientProvider client={queryClient}>{children}</NBAEverythingClientProvider>;
}
