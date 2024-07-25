import React, { useState, useEffect } from "react";
import { getTeamPoints } from "../services/teamService";
import { getPersonByName, getPersonPoints } from "../services/personService";
import "./Teams.css";
import { Person } from "../types";

function PersonButton({
  name,
  selected,
  onClick,
}: {
  name: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button
      className={`person ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function Team1Button({
  number,
  selected,
  points,
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  points: number;
  person: Person | undefined;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  let max = 9700;
  if (selected && person !== undefined) {
    name = person.name.toUpperCase() + "'S ";
    max = 1940;
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ {max}</div>
          </div>
          <div className="members">
            {["Michael", "Kevin", "Bob", "Larissa", "Gabby"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person !== undefined && person.name === name}
                onClick={(e) => onPersonClick(name, number, e)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Team2Button({
  number,
  selected,
  points,
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  points: number;
  person: Person | undefined;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  let max = 9700;
  if (selected && person !== undefined) {
    name = person.name.toUpperCase() + "'S ";
    max = 1940
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ {max}</div>
          </div>
          <div className="members">
            {["Cecily", "Eric", "Clare", "Anthony", "Mike"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person !== undefined && person.name === name}
                onClick={(e) => onPersonClick(name, number, e)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Team3Button({
  number,
  selected,
  points,
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  points: number;
  person: Person | undefined;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  let max = 9700;
  if (selected && person !== undefined) {
    name = person.name.toUpperCase() + "'S ";
    max = 1940;
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ {max}</div>
          </div>
          <div className="members">
            {["Mary", "Grant", "Joe", "Alexander", "Addison"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person !== undefined && person.name === name}
                onClick={(e) => onPersonClick(name, number, e)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Teams({
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
  const [team1Points, setTeam1Points] = useState<number>(0);
  const [team2Points, setTeam2Points] = useState<number>(0);
  const [team3Points, setTeam3Points] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        if (person !== undefined && team === 1) {
          const data = await getPersonPoints(person);
          setTeam1Points(data.total_points || 0);
        } else if (person !== undefined && team === 2) {
          const data = await getPersonPoints(person);
          setTeam2Points(data.total_points || 0);
        } else if (person !== undefined && team === 3) {
          const data = await getPersonPoints(person);
          setTeam3Points(data.total_points || 0);
        } else {
          let points = await getTeamPoints(1);
          console.log(points);
          setTeam1Points(points.total_points || 0);
          points = await getTeamPoints(2);
          setTeam2Points(points.total_points || 0);
          points = await getTeamPoints(3);
          setTeam3Points(points.total_points || 0);
        }
      } catch (error) {
        console.error("Failed to fetch team points:", error);
      }
    };

    fetchPoints();
  }, [person, team]);

  const onTeamClick = (number: number) => {
    if (team === number) {
      setTeam(null);
      setPerson(undefined);
    } else {
      setTeam(number);
      setPerson(undefined);
    }
  };

  const onPersonClick = async (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const person_obj = await getPersonByName(name);
    if (person !== undefined && person.name === person_obj.name) {
      setPerson(undefined);
      setTeam(null);
    } else {
      setTeam(team);
      setPerson(person_obj);
    }
  };

  return (
    <div className="team-list">
      <Team1Button
        number={1}
        selected={team === 1 || team === null}
        points={team1Points}
        person={team === 1 ? person : undefined}
        onTeamClick={() => onTeamClick(1)}
        onPersonClick={onPersonClick}
      />
      <Team2Button
        number={2}
        selected={team === 2 || team === null}
        points={team2Points}
        person={team === 2 ? person : undefined}
        onTeamClick={() => onTeamClick(2)}
        onPersonClick={onPersonClick}
      />
      <Team3Button
        number={3}
        selected={team === 3 || team === null}
        points={team3Points}
        person={team === 3 ? person : undefined}
        onTeamClick={() => onTeamClick(3)}
        onPersonClick={onPersonClick}
      />
    </div>
  );
}
