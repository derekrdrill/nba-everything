import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from "next/font/google";
import 'globals.css';
import { Header } from '@app/components';
import NBAEverything from './nba-everything/NBAEverything';
import NBAEverythingLayout from './nba-everything/layout/NBAEverythingLayout';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
        <NBAEverythingLayout>
          <NBAEverything />
          {children}
        </NBAEverythingLayout>
      </body>
    </html>
  );
}
