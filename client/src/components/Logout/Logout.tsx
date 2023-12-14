import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem('token', '');
    navigate('/login');
  };
  return (
    <Button variant="outlined" color="inherit" onClick={handleClick} size="small">
      Выйти
    </Button>
  );
};
