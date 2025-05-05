import '@testing-library/jest-dom';
import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';

import * as stories from '@/components/nba-everything/NBAEverythingSeasonAverages/NBAEverythingSeasonAverages.stories';

const { LightMode, DarkMode, TeamMode } = composeStories(stories);

describe('NBAEverythingSeasonAverages', () => {
  describe('Light Mode', () => {
    it('should render in light mode with correct styling', () => {
      render(<LightMode />);

      expect(screen.getByTestId('nba-everything-season-averages')).toBeInTheDocument();

      const container = screen.getByTestId('nba-everything-season-averages');
      expect(container).toHaveClass('bg-white');
    });
  });

  describe('Dark Mode', () => {
    it('should render in dark mode with correct styling', () => {
      render(<DarkMode />);

      expect(screen.getByTestId('nba-everything-season-averages')).toBeInTheDocument();

      const container = screen.getByTestId('nba-everything-season-averages');
      expect(container).toHaveClass('bg-gray-900');
    });
  });

  describe('Team Mode', () => {
    it('should render in team mode with correct styling', () => {
      render(<TeamMode />);

      expect(screen.getByTestId('nba-everything-season-averages')).toBeInTheDocument();

      const container = screen.getByTestId('nba-everything-season-averages');
      expect(container).toHaveClass('bg-[#1D1160]');
    });
  });

  // it('should display team stats data when available', () => {
  //   render(<LightMode />);

  //   // Verify that team stats are displayed
  //   expect(screen.getByText(mockTeam.full_name)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.wins}-${mockTeamStats.losses}`)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.ppg} PPG`)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.rpg} RPG`)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.apg} APG`)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.spg} SPG`)).toBeInTheDocument();
  //   expect(screen.getByText(`${mockTeamStats.bpg} BPG`)).toBeInTheDocument();
  // });

  // it('should handle loading state', () => {
  //   // Create a story with no mock data to test loading state
  //   const LoadingStory = composeStories({
  //     ...stories,
  //     Loading: {
  //       ...stories.LightMode,
  //       parameters: {
  //         ...stories.LightMode.parameters,
  //         mockData: undefined,
  //       },
  //     },
  //   }).Loading;

  //   render(<LoadingStory />);

  //   // Verify loading state is shown when data is not yet available
  //   expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  // });

  // it('should handle error state', () => {
  //   // Create a story with error state
  //   const ErrorStory = composeStories({
  //     ...stories,
  //     Error: {
  //       ...stories.LightMode,
  //       parameters: {
  //         ...stories.LightMode.parameters,
  //         mockData: null,
  //       },
  //     },
  //   }).Error;

  //   render(<ErrorStory />);

  //   // Verify error state is shown
  //   expect(screen.getByText(/Error loading team stats/i)).toBeInTheDocument();
  // });
});
