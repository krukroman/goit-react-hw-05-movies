import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import Loader from './components/Loader';
import Header from './components/Header';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "home-view" */),
);
export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomeView />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
