import { lazy } from 'react';
import { middleware } from './middleware';

const Main = lazy(() => import('@/Pages/Main'));

export default {
  path: 'main',
  children: [
    {
      index: true,
      element: <Main />,
      loader: middleware
    }
  ]
};
