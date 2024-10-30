import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search }) {
    const [movies, setMovies] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);
    const previusSearch = useRef();

    const getMovies = async () => {
       if(search == previusSearch.current) return
       
        try {
            setloading(true)
            seterror(null)
            previusSearch.current = search;
            const newMovies = await searchMovies({ search }); // Aquí usamos search como un objeto
            setMovies(newMovies);
        } catch (e) {
            seterror(e.message)
        }
        finally {
            setloading(false)
        }

    };

    return { movies, getMovies, loading, error };
}
