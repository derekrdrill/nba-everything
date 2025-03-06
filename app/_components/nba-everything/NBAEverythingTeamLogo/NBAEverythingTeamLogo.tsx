import { NBATeam } from '@types';

type NBAEverythingTeamLogoProps = {
  height?: number;
  imageStyles?: string;
  team?: NBATeam;
  width?: number;
};

export default function NBAEverythingTeamLogo({
  height,
  imageStyles,
  team,
  width,
}: NBAEverythingTeamLogoProps) {
  return (
    <img
      alt={team?.full_name || ''}
      className={imageStyles}
      height={height ?? 20}
      src={team?.logo}
      width={width ?? 20}
    />
  );
}
