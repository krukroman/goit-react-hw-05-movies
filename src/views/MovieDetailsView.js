import { useState, useEffect } from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import * as apiService from '../services/api-service';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieDetailsPage from '../components/MovieDetailsPage';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const { url } = useRouteMatch();
  const location = useLocation();
  const [movie, setMovie] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      setStatus(STATUS.PENDING);
      apiService
        .fetchMovieById(movieId)
        .then(data => {
          setMovie(data);
          setError(null);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          setError(error.message);
          setStatus(STATUS.REJECTED);
        });
    };
    getData();
  }, [movieId]);

  return (
    <>
      {status === STATUS.PENDING && <Loader />}
      {status === STATUS.RESOLVED && (
        <MovieDetailsPage
          movie={movie}
          movieId={movieId}
          url={url}
          location={location}
        />
      )}
      {status === STATUS.REJECTED && <Error message={error} />}
    </>
  );
}
