import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';
import Loader from '../Loader';
import noImage from '../../images/256px-No_image_available.svg.png';
import s from './MovieDetailsPage.module.css';

const CastPage = lazy(() =>
  import('../CastPage' /* webpackChunkName: "cast-page" */),
);

const ReviewsPage = lazy(() =>
  import('../ReviewsPage' /* webpackChunkName: "reviews-page" */),
);

const POSTER_URL = 'https://image.tmdb.org/t/p/w300';

export default function MovieDetailsPage({ movie, movieId, url, location }) {
  const history = useHistory();

  const { title, poster_path, vote_average, overview, genres } = movie;
  const normalizedGenres = genres.map(genre => genre.name).join(', ');

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  return (
    <>
      <button className={s.btn} type="button" onClick={onGoBack}>
        Go back
      </button>
      <div className={s.movie_info_wrapper}>
        <img
          src={poster_path ? `${POSTER_URL}${poster_path}` : noImage}
          alt={title}
          className={s.img}
        />
        <div className={s.description}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.rating}>
            Rating: <span>{vote_average * 10}%</span>
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
        <li className={s.link_item}>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: location?.state?.from,
              },
            }}
            exact
            className={s.link}
            activeClassName={s.link_active}
          >
            Cast
          </NavLink>
        </li>
        <li className={s.link_item}>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: location?.state?.from,
              },
            }}
            exact
            className={s.link}
            activeClassName={s.link_active}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Route path={`${url}/cast`}>
          <CastPage movieId={movieId} />
        </Route>
        <Route path={`${url}/reviews`}>
          <ReviewsPage movieId={movieId} />
        </Route>
      </Suspense>
    </>
  );
}

MovieDetailsPage.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array,
  }).isRequired,
  movieId: PropTypes.string,
  url: PropTypes.string,
};
