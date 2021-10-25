import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
export default function NavBar() {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to="/"
            exact
            className={s.link}
            activeClassName={s.link__active}
          >
            Home
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to="/movies"
            className={s.link}
            activeClassName={s.link__active}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
