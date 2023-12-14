import { createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';
import { ruRU as dataGridruRu } from '@mui/x-data-grid';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#1E81FB',
        light: '#70D4FF',
      },
      success: {
        main: '#177245',
      },
    },
    components: {
      MuiCardContent: {
        styleOverrides: {
          root: {
            paddingTop: '8px',
            paddingBottom: '8px',
            '&:last-child': {
              paddingBottom: '8px',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            position: 'absolute',
            bottom: '-1.2rem',
          },
        },
      },
    },
  },
  ruRU,
  dataGridruRu
);
