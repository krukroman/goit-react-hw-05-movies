import { useState, useEffect } from 'react';
import * as apiService from '../../services/api-service';
import noImage from '../../images/256px-No_image_available.svg.png';
import PropTypes from 'prop-types';
import s from './CastPage.module.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

export default function CastPage({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    apiService.fetchMovieCast(movieId).then(({ cast }) => setCast(cast));
  }, [movieId]);

  return (
    <ul className={s.list}>
      {cast.length > 0 ? (
        cast.map(({ id, name, character, profile_path }) => {
          return (
            <li key={id}>
              <img
                className={s.img}
                src={profile_path ? `${POSTER_URL}${profile_path}` : noImage}
                alt={name}
                width="200"
                height="300"
              />
              <h3>{name}</h3>
              <p>Character: {character}</p>
            </li>
          );
        })
      ) : (
        <li key="cast-not-found">
          <p>Cats not found</p>
        </li>
      )}
    </ul>
  );
}

CastPage.propTypes = {
  movieId: PropTypes.string.isRequired,
};
