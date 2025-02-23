import { ShimmerText } from 'shimmer-effects-react';

type Props = {};

export default function NBAEverythingGameModalShimmer({}: Props) {
  return (
    <div className='grid grid-cols-2 gap-4 mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
      <div className='col-span-1'>
        <ShimmerText mode='light' line={6} gap={2} />
      </div>
      <div className='col-span-1'>
        <ShimmerText mode='light' line={6} gap={2} />
      </div>
    </div>
  );
}
