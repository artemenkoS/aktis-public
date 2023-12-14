import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import * as React from 'react';

import { useGetFormatedPatientsQuery } from '../../api/patient/patientApi';
import { theme } from '../../styles/theme';
import { AutocompleteOption } from '../../types';
import { NewPatienButton } from '../NewPatientForm/NewPatienButton';

export type RawOption = {
  id: number;
} & Record<string, string>;

interface Props {
  label: string;
  value: AutocompleteOption | null;
  onChange: (value: AutocompleteOption | null) => void;
  error?: string;
}

export const PatientAutocomplete: React.FC<Props> = (props) => {
  const { label, value, onChange, error } = props;

  const [inputValue, setInputValue] = React.useState('');

  const { data: patients } = useGetFormatedPatientsQuery({ search: inputValue }, { skip: inputValue.length < 3 });

  const onInputChange = debounce((e) => setInputValue(e.target.value), 300);

  return (
    <Box sx={{ minWidth: 120, marginBottom: theme.spacing(2) }}>
      <FormControl fullWidth error={!!error}>
        <Autocomplete
          value={value}
          defaultValue={null}
          onChange={(_, newValue) => {
            onChange(newValue);
            setInputValue('');
          }}
          options={!inputValue ? [] : patients ?? []}
          noOptionsText={!inputValue ? 'Введите имя или фамилию пациента' : <NewPatienButton />}
          renderInput={(params) => (
            <div>
              <TextField
                error={!!error}
                {...params}
                label={label}
                variant="outlined"
                value={inputValue}
                onChange={onInputChange}
              />
              {error && <FormHelperText>{error}</FormHelperText>}
            </div>
          )}
        />
      </FormControl>
    </Box>
  );
};
