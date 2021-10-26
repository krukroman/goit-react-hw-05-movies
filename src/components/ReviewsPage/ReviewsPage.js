import { useState, useEffect } from 'react';
import * as apiService from '../../services/api-service';
import PropTypes from 'prop-types';
import s from './ReviewsPage.module.css';

export default function ReviewsPage({ movieId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    apiService
      .fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return (
    <ul className={s.list}>
      {reviews.length > 0 ? (
        reviews.map(({ id, author, content }) => {
          return (
            <li key={id} className={s.item}>
              <h3>{author}</h3>
              <p className={s.content}>{content}</p>
            </li>
          );
        })
      ) : (
        <li key="reviews-not-found">
          <p>Reviews not found</p>
        </li>
      )}
    </ul>
  );
}

ReviewsPage.propTypes = {
  movieId: PropTypes.string.isRequired,
};
