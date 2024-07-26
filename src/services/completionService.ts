import { Person, Task } from '../types';

const API_URL = 'http://localhost:5001/completion';

export const postCompletion = async (person: Person, task: Task, comment: string, link: string) => { // NEEDS TO BE FIXED
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ person, task, comment, link })
    });
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error posting completion:', error);
    throw error;
  }
};