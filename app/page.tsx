import NBAEverything from '@app/nba-everything/NBAEverything';
import NBAEverythingLayout from '@app/nba-everything/layout/NBAEverythingLayout';

export default async function Index() {
  return (
    <NBAEverythingLayout>
      <NBAEverything />;
    </NBAEverythingLayout>
  );
}
