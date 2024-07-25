import axios from 'axios';
import { Person } from '../types';

const API_URL = 'http://localhost:5001/task';

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`, {
      params: {
        name: name
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching task:', error);
    throw error;
  }
}

export const getTasksForPerson = async (person: Person, status: string) => {
  try {
    const response = await axios.get(`${API_URL}/person/${person.person_id}`, {
      params: {
        person_id: person.person_id,
        status: status
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTasksForTeam = async (person: Person, status: string) => {
  try {
    const response = await axios.get(`${API_URL}/team/${person.person_id}`, {
      params: {
        person_id: person.person_id,
        status: status
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};