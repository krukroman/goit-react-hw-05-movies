import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Loader from './components/Loader';
import Header from './components/Header';
import Section from './components/Section';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);
const MoviesView = lazy(() =>
  import('./views/MoviesView' /* webpackChunkName: "movies-view" */),
);
const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView' /* webpackChunkName: "movie-details-view" */
  ),
);

export default function App() {
  return (
    <>
      <Header />
      <Section>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>
            <Route path="/movies" exact>
              <MoviesView />
            </Route>
            <Route path="/movies/:movieId">
              <MovieDetailsView />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Section>
      <ToastContainer />
    </>
  );
}
