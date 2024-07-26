import React, { useState, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from './useFetch';

// Define the type for a Hero
interface Hero {
  id: number;
  name: string;
  rank: number;
  // Add other properties as necessary
  title?: string; // Make this optional if it may not always be present
}

// Define the params type for useParams
interface Params {
  id: string;
}

const Heroview: React.FC = () => {
  const { id } = useParams<Params>(); // Type the params to include id
  const history = useHistory();
  const { data: hero, error, isPending } = useFetch<Hero>(`http://localhost:8000/heroes/${id}`);
  const [newName, setNewName] = useState<string>('');

  const handleEdit = async () => {
    if (!hero) return; // Early return if hero is not loaded

    const updatedHero = { ...hero, name: newName };

    try {
      const response = await fetch(`http://localhost:8000/heroes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHero),
      });

      if (response.ok) {
        console.log('Name updated successfully');
        history.push('/allheroes'); // Redirect to /allheroes
      } else {
        console.error('Failed to update name');
      }
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  return (
    <div className="hero-view">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {hero && (
        <div>
          <h2>{hero.name}</h2>
          <p>Rank: {hero.rank}</p>
        </div>
      )}
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); handleEdit(); }}>
        <label>New Name: </label>
        <input
          type="text"
          required
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="edit-button">
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  );
}

export default Heroview;
