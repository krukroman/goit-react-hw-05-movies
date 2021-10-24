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
            <Route path="/movies" exact></Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Section>
      <ToastContainer />
    </>
  );
}
