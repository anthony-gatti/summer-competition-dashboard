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

    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskByName = async (name: string) => {
  try {
    const response = await fetch(`${API_URL}/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export const getTasksForPerson = async (person: Person, status: string) => { // NEEDS TO BE FIXED
  try {
    const response = await fetch(`${API_URL}/person/${person.person_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ person, status })
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTasksForTeam = async (person: Person, status: string) => { // NEEDS TO BE FIXED
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