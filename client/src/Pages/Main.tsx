import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { clearProfile } from '@/store/profileSlice';
import authService from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';

const Page = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector((state) => state.profile.profile);

  const onLogout = () => {
    authService.logOut();
    dispatch(clearProfile());
    navigate('/auth');
  };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <h1>name: {profile.name}</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Page;
