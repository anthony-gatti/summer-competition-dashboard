import React, { useState } from "react";
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
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">TEAM {number} TOTAL POINTS</div>
          <div className="points">
            <div className="current">1000</div>
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
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">TEAM {number} TOTAL POINTS</div>
          <div className="points">
            <div className="current">1000</div>
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
  person,
  onTeamClick,
  onPersonClick,
}: {
  number: number;
  selected: boolean;
  person: string;
  onTeamClick: () => void;
  onPersonClick: (
    name: string,
    team: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}) {
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className="team-content">
          <div className="team-header">TEAM {number} TOTAL POINTS</div>
          <div className="points">
            <div className="current">1000</div>
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
        person={team === 1 ? person : ""}
        onTeamClick={() => onTeamClick(1)}
        onPersonClick={onPersonClick}
      />
      <Team2Button
        number={2}
        selected={team === 2 || team === null}
        person={team === 2 ? person : ""}
        onTeamClick={() => onTeamClick(2)}
        onPersonClick={onPersonClick}
      />
      <Team3Button
        number={3}
        selected={team === 3 || team === null}
        person={team === 3 ? person : ""}
        onTeamClick={() => onTeamClick(3)}
        onPersonClick={onPersonClick}
      />
    </div>
  );
}
