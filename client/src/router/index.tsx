import { createBrowserRouter, Navigate } from 'react-router-dom';
import auth from './auth';
import main from './main';

const defaultRoute = {
  path: '/',
  errorElement: <Navigate to="/auth" />,
  children: [
    {
      index: true,
      element: <Navigate to="/auth" />
    }
  ]
};

const routes = [auth, main, defaultRoute];

export const router = createBrowserRouter(routes);
