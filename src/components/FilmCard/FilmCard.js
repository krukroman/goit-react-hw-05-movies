import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './FilmCard.module.css';
export default function FilmCard({ id, poster_path, title }) {
  return (
    <li className={s.item}>
      <Link to={`/movies/${id}`} className={s.link}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className={s.img}
          width="300"
        />
        <h2 className={s.title}>{title}</h2>
      </Link>
    </li>
  );
}

FilmCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
