import axios from 'axios';
import { Person, Task } from '../types';

const API_URL = 'http://localhost:1337/completion';

export const postCompletion = async (person: Person, task: Task, comment: string, link: string) => {
  try {
    const response = await axios.post(API_URL, {
      params: {
        person: person.person_id,
        task: task.task_id,
        comment: comment,
        link: link
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching points:', error);
    throw error;
  }
};