import React, { useState, useEffect } from "react";
import { getPeople, getPersonByName } from "../services/personService";
import {
  getTaskByName,
  getTasks,
  getTasksForPerson,
  getTasksForTeam,
} from "../services/taskService";
import { Task, Person } from "../types";
import "./Tasks.css";
import { postCompletion } from "../services/completionService";

function TaskButton({
  description,
  team,
  selected,
  onClick,
}: {
  number: number;
  name: string;
  description: string;
  restrictions: string;
  team: boolean;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button className={`task ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="task-container">
        <div className="task-content">
          <div className="task-description">{description}</div>
          {team && <div className="team-identifier">T</div>}
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

function AddButton({
  setSubmissionForm,
}: {
  setSubmissionForm: (value: boolean) => void;
}) {
  const onAddClick = () => {
    setSubmissionForm(true);
  };

  return (
    <div className="task-button">
      <button className="add" onClick={onAddClick}>
        Add a submission!
      </button>
    </div>
  );
}

function TaskInfo({
  task,
  completed,
  onClose,
  setSubmissionForm,
}: {
  task: Task;
  completed: boolean;
  onClose: () => void;
  setSubmissionForm: (value: boolean) => void;
}) {
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
        {!completed && <AddButton setSubmissionForm={setSubmissionForm} />}
      </div>
    </div>
  );
}

function SubmissionForm({
  person,
  team,
  task,
  onClose,
}: {
  person: Person | undefined;
  team: number;
  task: Task | undefined;
  onClose: () => void;
}) {
  const [people, setPeople] = useState<Person[]>();
  const [availableTasks, setAvailableTasks] = useState<Task[]>();
  const [selectedPerson, setSelectedPerson] = useState<Person | undefined>(
    person
  );
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(task);
  const [comment, setComment] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleSubmit = async () => {
    try {
      if (selectedPerson !== undefined && selectedTask !== undefined) {
        const data = await postCompletion(
          selectedPerson,
          selectedTask,
          comment,
          link
        );
      } else {
        console.error("Filed to add completion");
      }
    } catch (error) {
      console.error("Failed to add completion: ", error);
    }
    onClose();
  };

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();
        setPeople(data);
      } catch (error) {
        console.error("Failed to fetch people:", error);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (
        selectedPerson !== undefined &&
        selectedPerson.name !== "Team 1" &&
        selectedPerson.name !== "Team 2" &&
        selectedPerson.name !== "Team 3"
      ) {
        try {
          const data = await getTasksForPerson(selectedPerson, "available");
          setAvailableTasks(data);
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      } else {
        try {
          if (
            selectedPerson !== undefined &&
            (selectedPerson.name === "Team 1" ||
              selectedPerson.name === "Team 2" ||
              selectedPerson.name === "Team 3")
          ) {
            console.log("SELECTED PERSON: ", selectedPerson);
            const data = await getTasksForTeam(selectedPerson, "available");
            setAvailableTasks(data);
          } else {
            const data = await getTasks();
            setAvailableTasks(data);
          }
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      }
    };

    fetchTasks();
  }, [selectedPerson, team]);

  return (
    <div className="task-overlay" onClick={onClose}>
      <div
        className="task-overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="submission-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name*</label>
            <select
              id="name"
              required
              value={selectedPerson?.name}
              onChange={async (e) => {
                const data = await getPersonByName(e.target.value);
                setSelectedPerson(data);
              }}
            >
              <option value="" disabled>
                Select a person
              </option>
              {people?.map((person, index) => (
                <option key={index} value={person.name}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="task">Task*</label>
            <select
              id="task"
              required
              value={selectedTask?.task_name}
              onChange={async (e) => {
                const data = await getTaskByName(e.target.value);
                setSelectedTask(data);
              }}
            >
              <option value="" disabled>
                Select a task
              </option>
              {availableTasks?.map((task, index) => (
                <option key={index} value={task.task_name}>
                  {task.task_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="comment">Comments</label>
            <input
              id="comment"
              type="text"
              placeholder="Comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label htmlFor="link">Link</label>
            <input
              id="link"
              type="text"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="submit-button">
            <button className="add" type="submit">
              Submit
            </button>
          </div>
        </form>
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
  person: Person | undefined;
  setPerson: React.Dispatch<React.SetStateAction<Person | undefined>>;
}) {
  const [tasks, setTasks] = useState<Task[]>();
  const [completedTasks, setCompletedTasks] = useState<Task[]>();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isCompletedTask, setCompletedTask] = useState<boolean | undefined>();
  const [submissionForm, setSubmissionForm] = useState<boolean | undefined>(
    false
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (person === undefined) {
          if (team === null) {
            const data = await getTasks();
            console.log(data);
            setTasks(data);
            setCompletedTasks(undefined);
          } else {
            const team_name = "Team " + team;
            const team_obj = await getPersonByName(team_name);
            const data = await getTasksForTeam(team_obj, "available");
            setTasks(data);

            const compData = await getTasksForTeam(team_obj, "completed");
            setCompletedTasks(compData);
          }
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
  }, [person, team]);

  const onClick = (task: Task, completed: boolean) => {
    if (task === selectedTask) {
      setSelectedTask(undefined);
    } else {
      setSelectedTask(task);
    }
    setCompletedTask(completed);
  };

  const closeTaskInfo = () => {
    setSelectedTask(undefined);
  };

  const closeSubmissionForm = () => {
    setSubmissionForm(false);
  };

  const filteredTasks = tasks?.filter((task) =>
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks?.filter((task) =>
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="task-bar">
        <div className="header-container">
          <div className="task-header">Available tasks:</div>
          <div className="legend">T: Task eligible for 1 completion per team</div>
        </div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="task-list">
        {filteredTasks?.map((task: Task) => (
          <TaskButton
            number={task.task_id}
            name={task.task_name}
            description={task.description}
            restrictions={task.restrictions}
            team={task.team}
            selected={selectedTask === task}
            onClick={() => onClick(task, false)}
          />
        ))}
        {selectedTask !== undefined && isCompletedTask === false && (
          <TaskInfo
            task={selectedTask}
            completed={false}
            onClose={closeTaskInfo}
            setSubmissionForm={setSubmissionForm}
          />
        )}
        {submissionForm && (
          <SubmissionForm
            person={person}
            team={team || 0}
            task={selectedTask}
            onClose={closeSubmissionForm}
          />
        )}
      </div>
      {completedTasks !== undefined && completedTasks.length > 0 && (
        <>
          <div className="task-bar">
            <div className="task-header">Completed tasks:</div>
          </div>
          <div className="task-list">
            {filteredCompletedTasks?.map((task: Task) => (
              <TaskButton
                number={task.task_id}
                name={task.task_name}
                description={task.description}
                restrictions={task.restrictions}
                team={task.team}
                selected={selectedTask === task}
                onClick={() => onClick(task, true)}
              />
            ))}
            {selectedTask !== undefined && isCompletedTask === true && (
              <TaskInfo
                task={selectedTask}
                completed={true}
                onClose={closeTaskInfo}
                setSubmissionForm={setSubmissionForm}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
