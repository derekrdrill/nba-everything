import React from 'react';
import type { Preview } from '@storybook/react';
import '../app/_styles/globals.css';

const preview: Preview = {
  decorators: [
    Story => {
      return <Story />;
    },
  ],
  parameters: {
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/i,
    //   },
    // },
  },
  // tags: ['autodocs'],
};

export default preview;
