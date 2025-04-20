import { useNavigate, Link } from 'react-router-dom';
import authService from '@/services/auth.service';
import { useState } from 'react';

import Input from '@/components/Input/Input';

type Form = { login: string; password: string };

const initialForm: Form = { login: '', password: '' };

const Authorization = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({ ...initialForm });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const invalidEmpty = (state: string): boolean => {
    if (!state) {
      return true;
    }
    return false;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitted(true);

    for (const value of Object.values(form)) {
      if (invalidEmpty(value)) return;
    }

    authService
      .logIn(form)
      .then(() => navigate('/main'))
      .catch((e) => alert(e))
      .finally(() => setIsSubmitted(true));
  };

  return (
    <div className="auth-page">
      <div>
        <span>Нет аккаунта?</span>
        <Link to="/auth/registration">Зарегистрируйтесь</Link>
      </div>

      <form onSubmit={onSubmit}>
        <Input
          value={form.login}
          onChange={onChange}
          error={isSubmitted && invalidEmpty(form.login)}
          errorMessage="обязательное поле"
          placeholder="Логин"
          type="text"
          name="login"
        />
        <Input
          value={form.password}
          onChange={onChange}
          error={isSubmitted && invalidEmpty(form.password)}
          errorMessage="обязательное поле"
          placeholder="Пароль"
          type="password"
          name="password"
        />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default Authorization;
