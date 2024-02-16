import Home from './../../pages/home';
import Login from './../../pages/login';
import Register from './../../pages/register';

const routes = {
  homepage: {
    path: '/',
    component: <Home />,
  },
  login: {
    path: '/',
    component: <Login />,
  },
  register: {
    path: '/',
    component: <Register />,
  },
};

const defaultRoutes = {
  publicRoutes: [routes.login, routes.register],
  protectedRoutes: [routes.homepage],
};

export default defaultRoutes;
