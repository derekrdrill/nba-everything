type NBAEverythingGameSummaryProps = {
  overview: string;
  keyHighlights: string[];
  insight: string;
};

export default function NBAEverythingGameSummary({
  insight,
  keyHighlights,
  overview,
}: NBAEverythingGameSummaryProps) {
  return (
    <div>
      <h2 className='text-2xl text-center w-full'>Game Summary</h2>
      <h3 className='font-medium mt-3 text-xl'>Overview</h3>
      <p dangerouslySetInnerHTML={{ __html: overview }} />
      <h3 className='font-medium mt-3 text-xl'>Highlighted performances</h3>
      <ul className='list-disc pl-4'>
        {keyHighlights?.map(keyHighlight => (
          <li key={keyHighlight} dangerouslySetInnerHTML={{ __html: keyHighlight }} />
        ))}
      </ul>
      <h3 className='font-medium mt-3 text-xl'>Insight</h3>
      <p dangerouslySetInnerHTML={{ __html: insight }} />
    </div>
  );
}
