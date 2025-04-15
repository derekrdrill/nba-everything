import type { Meta, StoryObj } from '@storybook/react';
import TeamIcon from './TeamIcon';

const meta: Meta<typeof TeamIcon> = {
  title: 'Components/Common/DarkLightTeamMode/TeamIcon',
  component: TeamIcon,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className='p-4 bg-gray-800'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TeamIcon>;

export const Default: Story = {
  args: {},
};

export const WhiteFill: Story = {
  args: {
    fill: 'white',
  },
};

export const BlackFill: Story = {
  args: {
    fill: 'black',
  },
};

export const TeamColorFill: Story = {
  args: {
    fill: '#C8102E', // NBA Red color
  },
};
