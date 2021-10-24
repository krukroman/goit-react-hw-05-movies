import { useState, useEffect } from 'react';
import * as apiService from '../servises/api-servise';
import Container from '../components/Container';
import Loader from '../components/Loader';
import FilmList from '../components/FilmList';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const getData = () => {
      setStatus(STATUS.PENDING);
      apiService
        .fetchTrendingMovies()
        .then(({ results }) => {
          setMovies(results);
          setError(null);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          setError(error.message);
          setStatus(STATUS.REJECTED);
        });
    };
    getData();
  }, []);

  return (
    <Container>
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && <FilmList movies={movies} />}
      {status === STATUS.REJECTED && <div>{error}</div>}
    </Container>
  );
}
