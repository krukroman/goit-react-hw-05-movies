import PropTypes from 'prop-types';
import FilmCard from '../FilmCard';
import s from './FilmList.module.css';

export default function FilmList({ movies }) {
  return (
    <ul className={s.list}>
      {movies.map(({ id, poster_path, title }) => {
        return (
          <FilmCard key={id} poster_path={poster_path} id={id} title={title} />
        );
      })}
    </ul>
  );
}

FilmList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      poster_path: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
