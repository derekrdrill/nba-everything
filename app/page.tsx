import NBAEverything from './nba-everything/NBAEverything';
import NBAEverythingLayout from './nba-everything/layout/NBAEverythingLayout';

export default async function Index() {
  return (
    <NBAEverythingLayout>
      <NBAEverything />;
    </NBAEverythingLayout>
  );
}
