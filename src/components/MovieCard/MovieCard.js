import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import noImage from '../../imges/256px-No_image_available.svg.png';
import s from './MovieCard.module.css';

export default function MovieCard({ id, poster_path, title }) {
  return (
    <li className={s.item}>
      <Link to={`/movies/${id}`} className={s.link}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w300${poster_path}`
              : noImage
          }
          alt={title}
          className={s.img}
          width="300"
        />
        <h2 className={s.title}>{title}</h2>
      </Link>
    </li>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
