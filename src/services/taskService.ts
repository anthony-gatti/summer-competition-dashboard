import axios from 'axios';

const API_URL = 'http://localhost:1337/task';

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTasksForPerson = async (person: string, status: string) => {
  try {
    const response = await axios.get(`${API_URL}/person/${person}`, {
      params: {
        name: person,
        status: status
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTasksForTeam = async (team: number, status: string) => {
  const name = "Team " + team;
  try {
    const response = await axios.get(`${API_URL}/team/${team}`, {
      params: {
        name: name,
        status: status
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};