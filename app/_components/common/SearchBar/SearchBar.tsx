'use client';

import classNames from 'classnames';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface SearchBarProps {
  handleOptionSelect?: (value: string) => void;
  isDisabled?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
  rounded?: 'sm' | 'md' | 'lg';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'standard' | 'static' | 'outlined';
  value?: string;
}

export default function SearchBar({
  handleOptionSelect,
  isDisabled,
  options,
  rounded = 'md',
  size = 'md',
  value,
}: SearchBarProps) {
  const hasOptionsLoaded = !!options?.length;

  return (
    <div className='w-full'>
      <Listbox disabled={isDisabled} onChange={handleOptionSelect} value={value}>
        <ListboxButton
          className={classNames(
            'bg-gray-200 border border-gray-400 cursor-pointer w-full hover:border-gray-600',
            {
              'bg-gray-300 cursor-not-allowed pointer-events-none text-gray-500': isDisabled,
              'h-10': size === 'sm',
              'h-12': size === 'md',
              'h-14': size === 'lg',
              'rounded-md': rounded === 'sm',
              'rounded-lg': rounded === 'md',
              'rounded-xl': rounded === 'lg',
            },
          )}
          disabled={isDisabled}
        >
          <div className='flex justify-between mx-2'>
            {hasOptionsLoaded ? (
              <>
                {options?.find(option => option.value === value)?.label}
                <ChevronDownIcon className='h-5 w-5 text-gray-400' />
              </>
            ) : (
              'loading...'
            )}
          </div>
        </ListboxButton>
        <ListboxOptions className='absolute bg-white border-2 border-gray-100 max-h-96 overflow-auto rounded-b-md z-10'>
          {options?.map(option => (
            <ListboxOption
              className='border-b-2 border-gray-100 cursor-pointer p-2 w-full hover:bg-blue-200'
              key={option.value}
              value={option.value}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
