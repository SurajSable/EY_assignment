
import CharacterTable from '../components/CharacterTable';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})


function App() {
  return (
    <div>
      <h1 className='text-center font-bold'>Rick & Morty Characters</h1>
      <CharacterTable />
    </div>
  );
}
