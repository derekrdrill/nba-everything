import { ShimmerDiv } from 'shimmer-effects-react';

const NBAEverythingGameShimmerDiv = () => {
  return <ShimmerDiv className='rounded' height={14} loading mode='light' width={'40%'} />;
};

export default function NBAEverythingGameShimmer() {
  return (
    <div className='grid grid-cols-2 gap-4 mt-16 mx-6 md:mx-10 lg:mx-12 xl:mx-2'>
      <div className='col-span-1 flex flex-col gap-4'>
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
      </div>
      <div className='col-span-1 flex flex-col gap-4 justify-end items-end'>
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
        <NBAEverythingGameShimmerDiv />
      </div>
    </div>
  );
}
