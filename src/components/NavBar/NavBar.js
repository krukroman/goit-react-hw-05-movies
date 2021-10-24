import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
export default function NavBar() {
  return (
    <header className={s.header}>
      <div className="container">
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
      </div>
    </header>
  );
}
