import { useMovies } from '../hooks/useMovies';
import useSearch from '../hooks/useSearch';
import './App.css';
import { Movies } from './components/renderMovies';

function App() {
  const { search, setsearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies();
  };

  const handleChange = (event) => {
    setsearch(event.target.value);
  };

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <label>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent',
              }}
              value={search}
              onChange={handleChange}
              name='query'
              type="text"
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        <p style={{ color: 'red' }}>{error}</p>
      </header>

      <main className='main'>
        {
          loading ? <p>cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  );
}

export default App;
