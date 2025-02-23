import Image from 'next/image';
import { useNBAEverythingStore } from '@store';
import { NBATeam } from '@types';

const NEXT_PUBLIC_NBA_EVERYTHING_API_URL = process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL;
const NBA_EVERYTHING_LOGOS_LOCATION = 'images';

const getLogoSrc = ({ isRetro, teamName }: { isRetro?: boolean; teamName: string }) => {
  return `${NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/${NBA_EVERYTHING_LOGOS_LOCATION}/${teamName}${isRetro ? 'Retro' : ''}.png`;
};

type NBAEverythingTeamLogoProps = {
  height?: number;
  team?: NBATeam;
  width?: number;
};

export default function NBAEverythingTeamLogo({ height, team, width }: NBAEverythingTeamLogoProps) {
  const teamName = team?.full_name.replaceAll('_', '').replace(/\s/g, '') || '';

  return (
    <Image
      src={getLogoSrc({ teamName })}
      alt={team?.full_name || ''}
      width={width ?? 20}
      height={height ?? 20}
    />
  );
}
