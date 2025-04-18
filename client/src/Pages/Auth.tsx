import authService from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Page = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{ login: string; password: string }>({
    login: '',
    password: ''
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    authService
      .logIn(form)
      .then(() => navigate('/main'))
      .catch((e) => alert(e));
  };

  return (
    <div className="auth-page">
      <form onSubmit={onSubmit}>
        <input
          value={form.login}
          onChange={onChange}
          placeholder="login"
          type="text"
          name="login"
        />
        <input
          value={form.password}
          onChange={onChange}
          placeholder="password"
          type="password"
          name="password"
        />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default Page;
