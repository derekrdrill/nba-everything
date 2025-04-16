import { ShimmerDiv } from 'shimmer-effects-react';

const NBAEverythingGameShimmerDiv = () => {
  return <ShimmerDiv className='rounded' height={14} loading mode='light' width={'40%'} />;
};

export default function NBAEverythingGameShimmer() {
  return (
    <div className='grid grid-cols-1 gap-4 mx-6 md:mx-10 lg:grid-cols-2 lg:mx-12'>
      <div className='col-span-1 flex flex-col gap-4 place-items-center lg:place-items-start'>
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
      </div>
      <div className='col-span-1 flex-col gap-4 hidden items-end justify-end lg:flex'>
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
      </div>
    </div>
  );
}
