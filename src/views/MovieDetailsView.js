import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../services/api-service';
import Loader from '../components/Loader';
import Error from '../components/Error';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function MovieDetailsView() {
  const { movieId } = useParams();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      setStatus(STATUS.PENDING);
      apiService
        .fetchMovieById(movieId)
        .then(data => {
          console.log(data);
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
      {status === STATUS.RESOLVED && <div>Movie Details Page</div>}
      {status === STATUS.REJECTED && <Error message={error} />}
    </>
  );
}
