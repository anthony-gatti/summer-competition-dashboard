import axios from 'axios';

const API_URL = 'http://localhost:1337/team';

export const getTeamPoints = async (number: number) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        number: number
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};