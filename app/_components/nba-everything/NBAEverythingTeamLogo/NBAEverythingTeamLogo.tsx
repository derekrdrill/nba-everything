import { NBATeam } from '@types';

type NBAEverythingTeamLogoProps = {
  height?: number;
  team?: NBATeam;
  width?: number;
};

export default function NBAEverythingTeamLogo({ height, team, width }: NBAEverythingTeamLogoProps) {
  return (
    <img src={team?.logo} alt={team?.full_name || ''} width={width ?? 20} height={height ?? 20} />
  );
}
