import React, { useState, useEffect } from "react";
import { getTeamPoints } from "../services/teamService";
import { getPersonByName, getPersonPoints } from "../services/personService";
import "./Teams.css";
import { Person } from "../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

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

interface PercentagePieChartProps {
  percentage: number;
}

interface LeaderboardEntryProps {
  name: string;
  getPoints: (name: string) => Promise<any>;
}

const COLORS = ["#7D9CB3", "#B7BCB1"];

const PercentagePieChart: React.FC<PercentagePieChartProps> = ({
  percentage,
}) => {
  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  return (
    <PieChart width={150} height={150}>
      <Pie
        data={data}
        cx={70}
        cy={70}
        startAngle={90}
        endAngle={-270}
        innerRadius={30}
        outerRadius={70}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value}%`} />
    </PieChart>
  );
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  name,
  getPoints,
}) => {
  const [points, setPoints] = useState<number>(0);
  const percentage: number = 1940 > 0 ? (points / 1940) * 100 : 0;
  const remaining = 100 - percentage;

  useEffect(() => {
    const fetchPoints = async () => {
      const fetchedPoints = await getPoints(name);
      setPoints(fetchedPoints.total_points);
    };
    fetchPoints();
  }, [name, getPoints]);

  const data = [{ name: "Points", value: percentage, fill: COLORS[0] }];

  return (
    <div
      className="leaderboard-entry"
      style={{ display: "flex", alignItems: "center" }}
    >
      <span style={{ fontWeight: "bold", width: "15%" }}>{name}</span>
      <div className="bar-container">
        <BarChart
          width={250}
          height={30}
          data={data}
          layout="vertical"
          margin={{ top: -5, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip formatter={(value) => `${(value as number).toFixed(2)}%`} />
          <Bar dataKey="value" fill={COLORS[0]} radius={[10, 10, 10, 10]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </div>
      <span style={{ fontWeight: "bold", width: "15%" }}>
        {points || 0} / 1940
      </span>
    </div>
  );
};

const getPoints = async (name: string) => {
  const person: Person = await getPersonByName(name);
  const points: number = await getPersonPoints(person);
  return points;
};

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
  let graphName = "Team " + number;
  let max = 9700;
  let percent = points / max;
  percent = Math.round(percent * 10000) / 100;
  if (selected && person !== undefined) {
    name = person.name.toUpperCase() + "'S";
    graphName = person.name + "'s";
    max = 1940;
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className={`team-content ${selected ? "selected" : ""}`}>
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
        {selected && (
          <div className="team-info">
            <div className="progress-chart">
              <div className="graph">
                <PercentagePieChart percentage={percent} />
              </div>
              <div className="graph-label">{graphName} progress</div>
            </div>
            <div className="team-leaderboard">
              {["Michael", "Kevin", "Bob", "Larissa", "Gabby"].map((name) => (
                <LeaderboardEntry
                  key={name}
                  name={name}
                  getPoints={getPoints}
                />
              ))}
            </div>
          </div>
        )}
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
    max = 1940;
  }
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onTeamClick}>
      <div className="team-container">
        <div className={`team-content ${selected ? "selected" : ""}`}>
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
        {selected && (
          <div className="team-info">
            <div className="progress-chart"></div>
            <div className="team-leaderboard"></div>
          </div>
        )}
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
        <div className={`team-content ${selected ? "selected" : ""}`}>
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
        {selected && (
          <div className="team-info">
            <div className="progress-chart"></div>
            <div className="team-leaderboard"></div>
          </div>
        )}
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
      {(team === 1 || team === null) && (
        <Team1Button
          number={1}
          selected={team === 1}
          points={team1Points}
          person={team === 1 ? person : undefined}
          onTeamClick={() => onTeamClick(1)}
          onPersonClick={onPersonClick}
        />
      )}
      {(team === 2 || team === null) && (
        <Team2Button
          number={2}
          selected={team === 2}
          points={team2Points}
          person={team === 2 ? person : undefined}
          onTeamClick={() => onTeamClick(2)}
          onPersonClick={onPersonClick}
        />
      )}
      {(team === 3 || team === null) && (
        <Team3Button
          number={3}
          selected={team === 3}
          points={team3Points}
          person={team === 3 ? person : undefined}
          onTeamClick={() => onTeamClick(3)}
          onPersonClick={onPersonClick}
        />
      )}
    </div>
  );
}
