import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { mockUseNBAEverythingAtoms } from '@/mocks';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Common/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, context) => {
      mockUseNBAEverythingAtoms({
        useNBAEverythingAtoms: context.parameters.mockData?.useNBAEverythingAtoms,
      });

      return (
        <Fragment>
          <div className='w-96'>
            <Story />
          </div>
          {/* Add a portal container for Headless UI */}
          <div id='headlessui-portal-root' />
        </Fragment>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

const sampleOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    value: '1',
  },
  parameters: {
    mockData: {
      useNBAEverythingAtoms: {
        selectedMode: 'light',
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    options: sampleOptions,
    value: '1',
  },
  parameters: {
    mockData: {
      useNBAEverythingAtoms: {
        selectedMode: 'dark',
      },
    },
  },
};

export const TeamMode: Story = {
  args: {
    options: sampleOptions,
    value: '1',
  },
  parameters: {
    mockData: {
      useNBAEverythingAtoms: {
        selectedMode: 'team',
        selectedTeam: {
          colors: {
            primary: 'C8102E',
            secondary: 'FDB927',
            tertiary: '000000',
            quaternary: '9EA2A2',
          },
        },
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: '1',
    isDisabled: true,
  },
  parameters: {
    mockData: {
      useNBAEverythingAtoms: {
        selectedMode: 'light',
      },
    },
  },
};
