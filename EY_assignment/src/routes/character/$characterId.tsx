import { useQuery } from '@tanstack/react-query';
import { fetchCharacterById } from '../../api/rickAndMorty';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/character/$characterId')({
  component: CharacterDetails,
})

function CharacterDetails() {
  const { characterId } = useParams({ from: '/character/$characterId' });

  const { data, isLoading } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharacterById(characterId),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>
      <p>Origin: {data.origin.name}</p>
      <p>Location: {data.location.name}</p>
    </div>
  );
}
