import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { IsAuth } from '../components/Layout/IsAuthed';
import { AuthForm } from '../features/AuthForm/AuthForm';
import { History } from '../pages/History';
import { MainScreen } from '../pages/Main';
import { Patients } from '../pages/Patients';
import { VisitsHistory } from '../pages/VisitsHistory';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IsAuth />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/',
            element: <MainScreen />,
          },
          {
            path: '/patients',
            element: <Patients />,
          },
          {
            path: '/history',
            element: <History />,
          },
          {
            path: '/visits',
            element: <VisitsHistory />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <AuthForm />,
  },
]);
