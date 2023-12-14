import { useGetUserQuery } from './api/user/userApi';
import { Layout } from './components/Layout/Layout';
import { Loader } from './components/Loader/Loader';
import { useAppSelector } from './store/hooks';
import { userSelector } from './store/slices/authSlice';

function App() {
  useGetUserQuery();
  const user = useAppSelector(userSelector);
  if (!user) {
    return <Loader />;
  }
  return (
    <>
      <Layout />
    </>
  );
}

export default App;
