import { lazy } from 'react';
import { NavLink, Route, useHistory, useRouteMatch } from 'react-router-dom';
import noImage from '../../images/256px-No_image_available.svg.png';
import s from './MovieDetailsPage.module.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

export default function MovieDetailsPage({ movie, movieId, location }) {
  // const history = useHistory();
  const { url } = useRouteMatch();

  const { title, poster_path, vote_average, overview, genres } = movie;
  const normalizedGenres = genres.map(genre => genre.name).join(', ');

  const onGoBack = () => {
    console.log(location?.state);
  };
  return (
    <>
      <button className={s.btn} type="button" onClick={onGoBack}>
        Go back
      </button>
      <div className={s.container}>
        <img
          src={poster_path ? `${POSTER_URL}${poster_path}` : noImage}
          alt={title}
          className={s.img}
        />
        <div className={s.description}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.rating}>
            Rating: <span>{vote_average}</span>
          </p>
          <p className={s.sub_title}>Overview</p>
          <p className={s.text}>{overview ? overview : 'Overview not found'}</p>
          <p className={s.sub_title}>Genres</p>
          <p className={s.text}>
            {normalizedGenres ? normalizedGenres : 'Genres not found'}
          </p>
        </div>
      </div>
      <ul className={s.link_list}>
        <li>
          <NavLink
            to={`${url}/cast`}
            exact
            className={s.link}
            activeClassName={s.link_active}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/reviews`}
            exact
            className={s.link}
            activeClassName={s.link_active}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </>
  );
}
