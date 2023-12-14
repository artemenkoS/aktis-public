import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from './router/router.tsx';
import { store } from './store/store.ts';
import { globalStyle } from './styles/global.ts';
import { theme } from './styles/theme.ts';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.locale(ru);
dayjs.tz.setDefault(userTimeZone);

console.log(dayjs.locale());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={dayjs.locale()}>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              duration: 2200,
            }}
            position="top-right"
            gutter={10}
          />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
    <GlobalStyles styles={globalStyle} />
  </>
);
