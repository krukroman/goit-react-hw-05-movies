import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchform.module.css';

export default function Searchform({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query.toLocaleLowerCase());
    setQuery('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <input
        className={s.input}
        type="text"
        onChange={handleChange}
        value={query}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
      />
      <button className={s.btn} type="submit">
        Search
      </button>
    </form>
  );
}

Searchform.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
