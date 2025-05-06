import { useAppDispatch, useAppSelector } from '@/hooks/store';
import socketService from '@/services/socket.service';
import { clearProfile } from '@/store/profileSlice';
import authService from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export interface IMessage {
  _id: string;
  date: Date;
  text: string;
  name: string;
  login: string;
  photo: string;
  surname: string;
}

export interface Payload {
  text: string;
  userId: string;
}

const Page = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector((state) => state.profile.profile);

  const [text, setText] = useState<string>('');
  const [chat, setChat] = useState<IMessage[]>([]);

  useEffect(() => {
    socketService.connect();

    socketService.on<IMessage[]>('message', (data) => setChat((prev) => [...prev, ...data]));

    return () => {
      socketService.off('message');

      socketService.disconnect();
    };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSend = () => {
    socketService.emit<Payload>('message', { userId: profile._id, text });
    setText('');
  };

  const onLogout = () => {
    authService.logOut();
    dispatch(clearProfile());
    navigate('/auth');
  };

  return (
    <div className="main-page">
      <h1>Main Page</h1>
      <button onClick={onLogout}>Выйти</button>
      <div className="main-page__chat">
        {chat.map((dataElem, index) => (
          <p key={index}>
            <b>{dataElem.name}: </b>
            {dataElem.text}
          </p>
        ))}
      </div>
      <input value={text} onChange={onChange} />
      <button onClick={onSend}>Отправить</button>
    </div>
  );
};

export default Page;
