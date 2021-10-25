import { useState, useEffect } from 'react';
import * as apiService from '../services/api-service';
import Loader from '../components/Loader';
import MoviesList from '../components/MoviesList';
import Error from '../components/Error';

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
    <>
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && <MoviesList movies={movies} />}
      {status === STATUS.REJECTED && <Error message={error} />}
    </>
  );
}
