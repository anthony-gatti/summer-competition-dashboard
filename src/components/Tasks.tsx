import React, { useState, useEffect } from "react";
import { getTasks, getTasksForPerson } from "../services/taskService";
import { Task } from "../types";
import "./Tasks.css";

function TaskButton({
  description,
  selected,
  onClick,
}: {
  number: number;
  name: string;
  description: string;
  restrictions: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`task ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="task-container">
        <div className="task-content">
          <div className="task-description">{description}</div>
          <div className="info-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>task-info</title>
              <path d="M11 7V9H13V7H11M14 17V15H13V11H10V13H11V15H10V17H14M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function AddButton({ task }: { task: Task }) {
  const onAddClick = () => {
    alert();
  };

  return (
    <div className="task-button">
      <button className="add" onClick={onAddClick}>Add a submission!</button>
    </div>
  );
}

function Modal({ task, completed, onClose }: { task: Task; completed: boolean; onClose: () => void }) {
  return (
    <div className="task-overlay" onClick={onClose}>
      <div
        className="task-overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="task-popup-section">
          <div className="task-popup-header">
            <strong>Description:</strong>
          </div>
          {task.description}
        </div>
        <div className="divider"></div>
        <div className="task-popup-section">
          <div className="task-popup-header">
            <strong>Restrictions:</strong>
          </div>
          {task.restrictions}
        </div>
        {!completed && <AddButton task={task} />}
      </div>
    </div>
  );
}

export default function Tasks({
  team,
  setTeam,
  person,
  setPerson,
}: {
  team: number | null;
  setTeam: React.Dispatch<React.SetStateAction<number | null>>;
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [tasks, setTasks] = useState<Task[]>();
  const [completedTasks, setCompletedTasks] = useState<Task[]>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isCompletedTask, setCompletedTask] = useState<boolean | undefined>();

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Person: " + person);
      try {
        if (person === "") {
          const data = await getTasks();
          console.log(data);
          setTasks(data);
          setCompletedTasks(undefined);
        } else {
          const data = await getTasksForPerson(person, "available");
          setTasks(data);
          const compData = await getTasksForPerson(person, "completed");
          setCompletedTasks(compData);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, [person]);

  const onClick = (task: Task, completed: boolean) => {
    if (task === selectedTask) {
      setSelectedTask(undefined);
    } else {
      setSelectedTask(task);
    }
    setCompletedTask(completed);
  };

  const closeModal = () => {
    setSelectedTask(undefined);
  };

  return (
    <>
      <div className="task-bar">
        <div className="task-header">Available tasks:</div>
        <div className="search-bar">Search</div>
      </div>
      <div className="task-list">
        {tasks?.map((task: Task) => (
          <TaskButton
            number={task.task_id}
            name={task.task_name}
            description={task.description}
            restrictions={task.restrictions}
            selected={selectedTask === task}
            onClick={() => onClick(task, false)}
          />
        ))}
        {selectedTask !== undefined  && isCompletedTask===false && (
          <Modal task={selectedTask} completed={false} onClose={closeModal} />
        )}
      </div>
      {completedTasks !== undefined && completedTasks.length > 0 && (
        <>
          <div className="task-bar">
            <div className="task-header">Completed tasks:</div>
          </div>
          <div className="task-list">
            {completedTasks?.map((task: Task) => (
              <TaskButton
                number={task.task_id}
                name={task.task_name}
                description={task.description}
                restrictions={task.restrictions}
                selected={selectedTask === task}
                onClick={() => onClick(task, true)}
              />
            ))}
            {selectedTask !== undefined && isCompletedTask===true && (
              <Modal task={selectedTask} completed={true} onClose={closeModal} />
            )}
          </div>
        </>
      )}
    </>
  );
}
