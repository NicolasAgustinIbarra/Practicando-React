const API_KEY = '13396bb3';

export const searchMovies = async ({ search }) => {
  if (search === '') return [];

  try {
    const rawResponse = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const response = await rawResponse.json();

    // Mapeamos las películas y las retornamos
    return response.Search?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    })) || [];

  } catch (error) {
    throw new Error('Error en el fetching de las movies');
  }
};
