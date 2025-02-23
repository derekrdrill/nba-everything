type NBAEverythingStatProps = { stat: number | string; statLabel: string };

export default function NBAEverythingStat({ stat, statLabel }: NBAEverythingStatProps) {
  return (
    <div className='flex flex-col my-1'>
      <p className='text-2xl'>{statLabel}</p>
      <p>{stat}</p>
    </div>
  );
}
