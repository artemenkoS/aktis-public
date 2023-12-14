import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import { Visit } from '../../api/visit/types';
import { useAppDispatch } from '../../store/hooks';
import { setDeleteVisitId, setDeleteVisitModalOpened } from '../../store/slices/modalsSlice';

interface Props {
  visit: Visit;
  disabled?: boolean;
}

export const DeleteVisitButton: React.FC<Props> = ({ visit, disabled }) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setDeleteVisitId(visit));
    dispatch(setDeleteVisitModalOpened(true));
  };
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  );
};
