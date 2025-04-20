import { lazy } from 'react';

const Authorization = lazy(() => import('@/Pages/Auth/Authorization'));
const Registration = lazy(() => import('@/Pages/Auth/Registration'));

export default {
  path: 'auth',
  children: [
    {
      element: <Authorization />,
      index: true
    },
    {
      path: 'registration',
      element: <Registration />
    }
  ]
};
