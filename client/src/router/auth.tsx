import { lazy } from 'react';

const Auth = lazy(() => import('@/Pages/Auth'));

export default {
  path: 'auth',
  children: [
    {
      index: true,
      element: <Auth />
    }
  ]
};
