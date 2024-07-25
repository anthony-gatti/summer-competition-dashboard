import axios from 'axios';
import { Person } from '../types';

const API_URL = 'http://localhost:1337/person';

export const getPeople = async () => {
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
    console.error('Error fetching people:', error);
    throw error;
  }
};

export const getPersonByName = async (name: string) => { // NEEDS TO BE FIXED
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

export const getPersonPoints = async (person: Person) => { // NEEDS TO BE FIXED
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