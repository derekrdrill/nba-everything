type NBAEverythingGamesTeamStatProps = { stat: number | string; statLabel: string };

export default function NBAEverythingGamesTeamStat({
  stat,
  statLabel,
}: NBAEverythingGamesTeamStatProps) {
  return (
    <div className='flex flex-col my-1'>
      <p className='text-2xl'>{statLabel}</p>
      <p>{stat}</p>
    </div>
  );
}
