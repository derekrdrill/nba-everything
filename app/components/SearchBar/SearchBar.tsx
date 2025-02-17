'use client';

import classNames from 'classnames';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface SearchBarProps {
  handleOptionSelect?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  options?: {
    label: string;
    value: string;
  }[];
  variant?: 'standard' | 'static' | 'outlined';
  value?: string;
}

export default function SearchBar({
  handleOptionSelect,
  options,
  size = 'md',
  value,
}: SearchBarProps) {
  const hasOptionsLoaded = !!options?.length;

  return (
    <div className='w-full'>
      <Listbox disabled={!options?.length} onChange={handleOptionSelect} value={value}>
        <ListboxButton
          className={classNames('border border-gray-300 cursor-pointer rounded-md w-full', {
            'bg-gray-100 cursor-not-allowed': !hasOptionsLoaded,
            'h-10': size === 'sm',
            'h-12': size === 'md',
            'h-14': size === 'lg',
          })}
          disabled={!hasOptionsLoaded}
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
        <ListboxOptions className='border-2 border-gray-100 max-h-96 overflow-auto rounded-b-md'>
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
