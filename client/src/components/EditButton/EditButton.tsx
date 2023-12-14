import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export const EditButton: React.FC<Props> = ({ disabled, onClick }) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
      <EditIcon fontSize="small" />
    </IconButton>
  );
};
