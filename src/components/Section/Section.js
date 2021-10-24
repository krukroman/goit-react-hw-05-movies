import Container from '../Container';
import s from './Section.module.css';
export default function Section({ children }) {
  return (
    <section className={s.section}>
      <Container>{children}</Container>
    </section>
  );
}
