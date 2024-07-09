import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Teams from './components/Teams';
import Tasks from './components/Tasks';

interface Data {
  id: number;
  message: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data[0]));
  }, []);

  return (
    <div>
      <Header />
      <Teams />
      <Tasks />
    </div>
  );
};

export default App;
