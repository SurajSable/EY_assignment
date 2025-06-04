// src/components/CharacterTable.tsx
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { fetchCharacters } from '../api/rickAndMorty';


export default function CharacterTable() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/' });
  const page = Number(search.page || 1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
  ///keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={() => refetch()} className="bg-gray-500 text-white px-4 py-2 rounded my-3 mx-3">🔄 Refresh</button>
      <table className='table-auto border border-gray-400 w-full text-center'>
        <thead>
          <tr><th>Name</th><th>Status</th><th>Species</th></tr>
        </thead>
        <tbody>
          {data.results.map((char: any) => (
            <tr key={char.id} onClick={() => navigate({ to: `/character/${char.id}` })}>
              <td>{char.name}</td>
              <td>{char.status}</td>
              <td>{char.species}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='text-end me-3 my-3'>
        <button disabled={page === 1} onClick={() => navigate({ to: '/', search: { page: page - 1 } })} className="bg-gray-500 text-white px-4 py-2 rounded">Prev</button>
        <span> Page {page} </span>
        <button disabled={!data.info.next} onClick={() => navigate({ to: '/', search: { page: page + 1 } })} className="bg-gray-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>
  );
}
