import { lazy } from 'react';

const Main = lazy(() => import('@/Pages/Main'));

export default {
  path: 'main',
  children: [
    {
      index: true,
      element: <Main />
    }
  ]
};
