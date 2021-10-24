import PropTypes from 'prop-types';
import s from './Error.module.css';
export default function Error({ message }) {
  return (
    <div className={s.container}>
      <p className={s.title}>Error in API Servise</p>
      <p className={s.message}>{message}</p>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
