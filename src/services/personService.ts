import axios from 'axios';

const API_URL = 'http://localhost:1337/person';

export const getPersonPoints = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`, {
      params: {
        name: name
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};