import React, { useState } from 'react';
import Header from './components/Header';
import Teams from './components/Teams';
import Tasks from './components/Tasks';

const App: React.FC = () => {
  const [team, setTeam] = useState<number | null>(null);
  const [person, setPerson] = useState<string>("");

  return (
    <div>
      <Header />
      <Teams team={team} setTeam={setTeam} person={person} setPerson={setPerson} />
      <Tasks team={team} setTeam={setTeam} person={person} setPerson={setPerson} />
    </div>
  );
};

export default App;
