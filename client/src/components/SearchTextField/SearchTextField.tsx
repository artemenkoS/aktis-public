import { InputAdornment, TextField } from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export const SearchTextfield: React.FC<Props> = ({ onChange }) => {
  return (
    <TextField
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <GridSearchIcon />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};
