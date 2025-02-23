import axios from 'axios';

const getGameStats = async ({ gameId }: { gameId?: number }) => {
  const gameOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_NBA_EVERYTHING_API_URL}/game/${gameId}`,
  };

  try {
    const response = await axios.request(gameOptions);

    return response.data.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch current teams');
  }
};

export { getGameStats };
