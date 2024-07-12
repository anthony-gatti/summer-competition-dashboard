import React, { useState, useEffect } from "react";
import { getTasks } from "../services/taskService";
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

function Modal({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div className="task-overlay" onClick={onClose}>
      <div
        className="task-overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="task-popup">
          <div className="task-popup-header">
            <strong>Description:</strong>
          </div>
          {task.description}
        </div>
        <div className="task-popup">
          <div className="task-popup-header">
            <strong>Restrictions:</strong>
          </div>
          {task.restrictions}
        </div>
      </div>
    </div>
  );
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>();
  const [selectedTask, setSelectedTask] = useState<Task>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const onClick = (task: Task) => {
    if (task === selectedTask) {
      setSelectedTask(undefined);
    } else {
      setSelectedTask(task);
    }
  };

  const closeModal = () => {
    setSelectedTask(undefined);
  };

  return (
    <div className="task-list">
      {tasks?.map((task: Task) => (
        <TaskButton
          number={task.task_id}
          name={task.task_name}
          description={task.description}
          restrictions={task.restrictions}
          selected={selectedTask === task}
          onClick={() => onClick(task)}
        />
      ))}
      {selectedTask !== undefined && (
        <Modal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
}
