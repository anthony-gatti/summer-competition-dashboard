import axios from 'axios';
import { Person } from '../types';

const API_URL = 'http://localhost:1337/person';

export const getPeople = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};

export const getPersonByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`, {
      params: {
        name: name
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
}

export const getPersonPoints = async (person: Person) => {
  try {
    const response = await axios.get(`${API_URL}/${person}/points`, {
      params: {
        person_id: person.person_id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};