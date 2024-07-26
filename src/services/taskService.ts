import axios from 'axios';
import { Person, Task } from '../types';

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

export const getTaskByCompletion = async (completion_id: string) => {
  try {
    const response = await fetch(`${API_URL}/${completion_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completion_id })
    });

    const data = await response.json();

    return data[0];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

export const getTasksForPerson = async (person: Person, status: string, type: string) => {
  try {
    const response = await fetch(`${API_URL}/person/${person.person_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ person, status })
    });

    const completions = await response.json();
    const tasks = await getTasks();
    
    tasks.forEach((task: Task) => {
      completions.forEach((comp: string) => {
        if(task.task_id === comp) {
          task.repititions--;
        }
      })
    })

    const available_array: Task[] = [];
    const complete_array: Task[] = [];

    if(type === 'person') {
      tasks.forEach((task: Task) => {
        if(!task.team){
          if(task.repititions > 0){
            available_array.push(task);
          } else {
            complete_array.push(task);
          }
        }
      })
    }else {
      tasks.forEach((task: Task) => {
        if(task.team){
          if(task.repititions > 0){
            available_array.push(task);
          } else {
            complete_array.push(task);
          }
        }
      })
    }

    if(status === 'available'){
      return available_array;
    } else {
      return complete_array;
    }

  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};