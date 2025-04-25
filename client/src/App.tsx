import { RouterProvider } from 'react-router-dom';
import authService from './services/auth.service';
import { setProfile } from '@/store/profileSlice';
import { useAppDispatch } from './hooks/store';
import { useEffect } from 'react';
import { router } from './router';

import '@/assets/sass/index.sass';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authService
      .getProfile()
      .then((data) => dispatch(setProfile(data)))
      .catch(() => {});
  }, [dispatch]);

  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
