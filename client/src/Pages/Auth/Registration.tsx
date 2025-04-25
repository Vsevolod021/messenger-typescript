import { useNavigate, Link } from 'react-router-dom';
import authService from '@/services/auth.service';
import { useState } from 'react';

import Input from '@/components/Input/Input';
import { useAppDispatch } from '@/hooks/store';
import { setProfile } from '@/store/profileSlice';

type Form = {
  login: string;
  password: string;
  passwordRepeat: string;
  name: string;
  surname: string;
};

const initialForm: Form = { login: '', password: '', passwordRepeat: '', name: '', surname: '' };

const Authorization = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form>({ ...initialForm });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const invalidEmpty = (state: string): boolean => {
    if (!state) {
      return true;
    }
    return false;
  };

  const passwordsNotMatched = (): boolean => {
    if (form.password !== form.passwordRepeat) {
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
      if (invalidEmpty(value) || passwordsNotMatched()) return;
    }

    authService
      .signUp(form)
      .then((data) => {
        dispatch(setProfile(data));
        navigate('/main');
      })
      .catch((e) => alert(e))
      .finally(() => setIsSubmitted(true));
  };

  const passwordRepeatErrorMessage = invalidEmpty(form.passwordRepeat)
    ? 'Обязательное поле'
    : 'Пароли не совпадают';

  const passwordRepeatError =
    isSubmitted && (invalidEmpty(form.passwordRepeat) || passwordsNotMatched());

  return (
    <div className="auth-page">
      <div>
        <span>Уже зарегистрированы?</span>
        <Link to="/auth">Войдите</Link>
      </div>

      <form onSubmit={onSubmit}>
        <Input
          value={form.name}
          onChange={onChange}
          error={isSubmitted && invalidEmpty(form.name)}
          errorMessage="обязательное поле"
          placeholder="Имя"
          type="text"
          name="name"
        />
        <Input
          value={form.surname}
          onChange={onChange}
          placeholder="Фамилия"
          type="text"
          name="surname"
        />
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
        <Input
          value={form.passwordRepeat}
          onChange={onChange}
          error={passwordRepeatError}
          errorMessage={passwordRepeatErrorMessage}
          placeholder="Повторите пароль"
          type="password"
          name="passwordRepeat"
        />
        <button type="submit">Submit form</button>
      </form>
    </div>
  );
};

export default Authorization;
