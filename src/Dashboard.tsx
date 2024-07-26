import React from 'react';
import Herolist from './Herolist';
import useFetch from './useFetch';


interface Hero {
  id: number;
  name: string;
  rank: number;
 
}

const Dashboard: React.FC = () => {
  const { data: heroes, isPending, error } = useFetch<Hero[]>('http://localhost:8000/heroes');

  const handleEditName = (id: number, newName: string) => {
  
  };

  return (
    <div className="dashboard">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {heroes && (
        <Herolist
          heroes={heroes.filter(hero => hero.rank <= 4)}
          title="Top 4 Ranked Heroes"
          onEditName={handleEditName}
        />
      )}
    </div>
  );
};

export default Dashboard;
