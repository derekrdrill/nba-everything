import type { Metadata } from 'next';
import { Header } from '@/components/common';

import NBAEverythingClient from '@/app/_client/NBAEverythingClient';
import NBAEverything from '@/components/nba-everything';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'NBA Everything',
  description: 'All things NBA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <NBAEverythingClient>
          <NBAEverything />
          {children}
        </NBAEverythingClient>
      </body>
    </html>
  );
}
