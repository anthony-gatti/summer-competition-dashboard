import React, { useState, useEffect } from "react";
import { getTeamPoints } from "../services/teamService";
import { getPersonPoints } from "../services/personService";
import "./Teams.css";

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
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  if(selected && person !== "") {
    name = person.toUpperCase() + "'S ";
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ 9700</div>
          </div>
          <div className="members">
            {["Michael", "Kevin", "Bob", "Larissa", "Gabby"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person === name}
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
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  if(selected && person !== "") {
    name = person.toUpperCase() + "'S ";
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ 9700</div>
          </div>
          <div className="members">
            {["Cecily", "Eric", "Clare", "Anthony", "Mike"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person === name}
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
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  let name = "TEAM " + number;
  if(selected && person !== "") {
    name = person.toUpperCase() + "'S ";
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">{name} POINTS</div>
          <div className="points">
            <div className="current">{points}</div>
            <div className="max">/ 9700</div>
          </div>
          <div className="members">
            {["Mary", "Grant", "Joe", "Alexander", "Addison"].map((name) => (
              <PersonButton
                key={name}
                name={name}
                selected={person === name}
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
  person: string;
  setPerson: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [team1Points, setTeam1Points] = useState<number>(0);
  const [team2Points, setTeam2Points] = useState<number>(0);
  const [team3Points, setTeam3Points] = useState<number>(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let data1;
        if(person!=="" && team===1){
          data1 = await getPersonPoints(person);
        }else {
          data1 = await getTeamPoints(1);
        }
        if(data1.total_points){
          setTeam1Points(data1.total_points);
        } else {
          setTeam1Points(0);
        }

        let data2;
        if(person!=="" && team===2){
          data2 = await getPersonPoints(person);
        }else {
          data2 = await getTeamPoints(2);
        }
        if(data2.total_points){
          setTeam2Points(data2.total_points);
        } else {
          setTeam2Points(0);
        }

        let data3;
        if(person!=="" && team===3){
          data3 = await getPersonPoints(person);
        }else {
          data3 = await getTeamPoints(3);
        }
        if(data3.total_points){
          setTeam3Points(data3.total_points);
        } else {
          setTeam3Points(0);
        }
      } catch (error) {
        console.error("Failed to fetch team points:", error);
      }
    };

    fetchTasks();
  }, [person, team]);

  const onTeamClick = (number: number) => {
    if (team === number) {
      setTeam(null);
      setPerson("");
    } else {
      setTeam(number);
      setPerson("");
      console.log("Person unset");
    }
  };

  const onPersonClick = (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (person === name) {
      setPerson("");
      setTeam(null);
    } else {
      setTeam(team);
      setPerson(name);
    }
  };

  return (
    <div className="team-list">
      <Team1Button
        number={1}
        selected={team === 1 || team === null}
        points={team1Points}
        person={team === 1 ? person : ""}
        onTeamClick={() => onTeamClick(1)}
        onPersonClick={onPersonClick}
      />
      <Team2Button
        number={2}
        selected={team === 2 || team === null}
        points={team2Points}
        person={team === 2 ? person : ""}
        onTeamClick={() => onTeamClick(2)}
        onPersonClick={onPersonClick}
      />
      <Team3Button
        number={3}
        selected={team === 3 || team === null}
        points={team3Points}
        person={team === 3 ? person : ""}
        onTeamClick={() => onTeamClick(3)}
        onPersonClick={onPersonClick}
      />
    </div>
  );
}
