import { useState, useEffect } from 'react';
import * as apiService from '../servises/api-servise';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Searchform from '../components/Searchform';
import FilmList from '../components/FilmList';
import { toast } from 'react-toastify';

const TOAST_OPTIONS = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function MoviesView() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    const getData = () => {
      setStatus(STATUS.PENDING);
      apiService
        .fetchSearchingMovies(query)
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
  }, [query]);

  const onSearchformSubmit = query => {
    if (!query.trim()) {
      toast.error('Empty query, type something', TOAST_OPTIONS);
      return;
    }
    setQuery(query);
    setMovies([]);
  };
  return (
    <>
      <Searchform onSubmit={onSearchformSubmit} />
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && <FilmList movies={movies} />}
      {status === STATUS.REJECTED && <Error message={error} />}
    </>
  );
}
