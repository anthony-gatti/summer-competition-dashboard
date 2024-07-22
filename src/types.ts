export interface Task {
    task_id: number;
    task_name: string;
    description: string;
    points: number;
    restrictions: string;
    repititions: number;
    team: boolean;
  }

  export interface Person {
    person_id: number;
    name: string;
    team_number: number
  }