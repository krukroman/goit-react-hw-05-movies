import Spinner from 'react-loader-spinner';
import { createPortal } from 'react-dom';
import s from './Loader.module.css';
const portal = document.getElementById('portal');

export default function Loader() {
  return createPortal(
    <div className={s.backdrop}>
      <Spinner type="Oval" color="orangered" height={150} width={150} />
      <p className={s.text}>Loading...</p>
    </div>,
    portal,
  );
}
