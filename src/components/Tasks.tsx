import React, { useState } from "react";
import "./Tasks.css";

function TaskButton({
  number,
  selected,
  onClick,
}: {
  number: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`task ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="task-container">
        <div className="task-content">
          {number}
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

function Modal({ task, onClose }: { task: number; onClose: () => void }) {
  return (
    <div className="task-overlay" onClick={onClose}>
      <div
        className="task-overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Task Number: {task}</p>
      </div>
    </div>
  );
}

export default function Tasks() {
  const [task, setTask] = useState(0);

  const onClick = (id: number) => {
    if (id === task) {
      setTask(0);
    } else {
      setTask(id);
    }
  };

  const closeModal = () => {
    setTask(0);
  };

  return (
    <div className="task-list">
      <TaskButton number={1} selected={task === 1} onClick={() => onClick(1)} />
      <TaskButton number={2} selected={task === 2} onClick={() => onClick(2)} />
      <TaskButton number={3} selected={task === 3} onClick={() => onClick(3)} />
      <TaskButton number={4} selected={task === 4} onClick={() => onClick(4)} />
      <TaskButton number={5} selected={task === 5} onClick={() => onClick(5)} />
      <TaskButton number={6} selected={task === 6} onClick={() => onClick(6)} />

      {task !== 0 && <Modal task={task} onClose={closeModal} />}
    </div>
  );
}
