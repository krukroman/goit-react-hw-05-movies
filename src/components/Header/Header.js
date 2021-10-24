import Container from '../Container';
import Navigation from '../Navigation';
import s from './Header.module.css';

export default function Header() {
  return (
    <header className={s.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
}
