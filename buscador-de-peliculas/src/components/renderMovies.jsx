import React from 'react'


function RenderMovies({ movies }) {
    return (
        <ul className='movies'>
            {movies.map(movie => (
                <li className='movie' key={movie.id}>
                    <h2>{movie.title} {movie.year}</h2>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))}
        </ul>
    )
}

function NoMoviesResult() {
    return (
        <p>No se encontraron películas para esta búsqueda</p>
    )
}

export function Movies({movies}) {
    const hasMovies = movies?.length > 0;

    return (
       hasMovies ? <RenderMovies movies={movies}/> : <NoMoviesResult/>
    )

}