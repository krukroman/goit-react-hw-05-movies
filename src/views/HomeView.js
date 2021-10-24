import { useState, useEffect } from 'react';
import * as apiService from '../servises/api-servise';
import Container from '../components/Container';
import Loader from '../components/Loader';
import FilmList from '../components/FilmList';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      apiService
        .fetchTrendingMovies()
        .then(({ results }) => {
          setMovies(results);
          setError(null);
        })
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    };
    getData();
  }, []);

  return (
    <Container>
      {movies ? <FilmList movies={movies} /> : <div>{error}</div>}
      {isLoading && <Loader />}
    </Container>
  );
}
