import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthMutation } from '../../api/auth/authApi';
import Wrapper from './styled';

interface FormValues {
  login: string;
  password: string;
}

export const AuthForm = () => {
  const token = localStorage.getItem('token');

  const location = useLocation();

  const [mutate] = useAuthMutation();

  const { register, handleSubmit } = useForm<FormValues>();

  const handleAuthSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({ login: data.login, password: data.password });
  };

  if (token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <form onSubmit={handleSubmit(handleAuthSubmit)}>
      <Wrapper>
        <Typography>Авторизация</Typography>
        <TextField fullWidth placeholder="Имя пользователя" {...register('login')} />
        <TextField type="password" fullWidth placeholder="Пароль" {...register('password')} />
        <Button fullWidth type="submit" variant="outlined">
          Войти
        </Button>
      </Wrapper>
    </form>
  );
};
