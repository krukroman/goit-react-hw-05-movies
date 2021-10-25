import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as apiService from '../services/api-service';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Searchform from '../components/Searchform';
import MoviesList from '../components/MoviesList';
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
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
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
    setMovies([]);
    history.push({ ...location, search: `query=${query}` });
  };
  return (
    <>
      <Searchform onSubmit={onSearchformSubmit} />
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && <MoviesList movies={movies} />}
      {status === STATUS.REJECTED && <Error message={error} />}
    </>
  );
}
