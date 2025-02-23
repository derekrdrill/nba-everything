type NBASeasonAverageProps = {
  statValue?: string;
  statTitle: string;
};

export default function NBASeasonAverage({ statValue, statTitle }: NBASeasonAverageProps) {
  return (
    statValue &&
    statTitle && (
      <div className='flex flex-col'>
        <p className='text-2xl'>{statTitle}</p>
        <p>{statValue}</p>
      </div>
    )
  );
}
