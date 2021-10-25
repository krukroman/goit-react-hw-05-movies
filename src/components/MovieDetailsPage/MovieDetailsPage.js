import noImage from '../../images/256px-No_image_available.svg.png';
import s from './MovieDetailsPage.module.css';

const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsPage({ movie, movieId }) {
  const { title, poster_path, vote_average, overview, genres } = movie;
  const normalizedGenres = genres.map(genre => genre.name).join(', ');
  return (
    <div className={s.container}>
      <img
        src={poster_path ? `${POSTER_URL}${poster_path}` : noImage}
        alt={title}
        className={s.img}
      />
      <div className={s.decription}>
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
  );
}
