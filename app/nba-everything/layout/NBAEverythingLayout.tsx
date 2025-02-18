'use client';

import queryClient from '@client/queryClient';
import { QueryClientProvider as NBAEverythingClientProvider } from '@tanstack/react-query';

type NBAEverythingLayoutProps = {
  children: React.ReactNode;
};

export default function NBAEverythingLayout({ children }: NBAEverythingLayoutProps) {
  return <NBAEverythingClientProvider client={queryClient}>{children}</NBAEverythingClientProvider>;
}
