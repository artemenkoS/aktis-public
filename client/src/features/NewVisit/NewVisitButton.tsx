import { Button } from '@mui/material';

import { useAppDispatch } from '../../store/hooks';
import { setEditVisitModalSubmitText, setNewVisitModalOpened } from '../../store/slices/modalsSlice';
import { theme } from '../../styles/theme';

export const NewVisitButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setNewVisitModalOpened(true));
    dispatch(setEditVisitModalSubmitText('Создать запись'));
  };
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      color="success"
      size="large"
      sx={{ height: theme.spacing(4), alignSelf: 'flex-start', position: 'absolute', right: theme.spacing(3) }}
    >
      Создать запись
    </Button>
  );
};
