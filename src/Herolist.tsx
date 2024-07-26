import React from 'react';
import { Link } from 'react-router-dom';

// Define the type for a Hero
interface Hero {
  id: number;
  name: string;
  rank: number;
  // Add other properties as necessary
}

// Define the props for Herolist component
interface HerolistProps {
  heroes: Hero[];
  title: string;
  onEditName: (id: number, newName: string) => void;
}

const Herolist: React.FC<HerolistProps> = ({ heroes, title, onEditName }) => {
  return (
    <div className="hero-list">
      <h2 className="main">{title}</h2>
      {heroes.map(hero => (
        <div className="hero-preview" key={hero.id}>
          <Link to={`/heroes/${hero.id}`}>
            <p>Rank: {hero.rank}</p>
            <h2>{hero.name}</h2>
          </Link>
          <button onClick={() => onEditName(hero.id, `Updated Name for ${hero.name}`)}>Edit Name</button>
        </div>
      ))}
    </div>
  );
}

export default Herolist;
