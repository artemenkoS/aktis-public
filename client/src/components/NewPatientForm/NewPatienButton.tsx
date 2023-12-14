import { Button } from '@mui/material';

import { useAppDispatch } from '../../store/hooks';
import { setNewPatientModalOpened } from '../../store/slices/modalsSlice';
import { theme } from '../../styles/theme';

export const NewPatienButton = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant="outlined"
      onClick={() => dispatch(setNewPatientModalOpened(true))}
      sx={{ height: theme.spacing(4) }}
    >
      Добавить пациента
    </Button>
  );
};
