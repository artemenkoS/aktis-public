import React from 'react';

import { SearchTextfield } from '../../components/SearchTextField/SearchTextField';
import { useAppDispatch } from '../../store/hooks';
import { setPatientsTableSearch } from '../../store/slices/tablesSlice';

export const PatientSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearchValueChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    dispatch(setPatientsTableSearch(e.target.value.replace(/\s/g, '')));
  };

  React.useEffect(() => {
    return () => {
      dispatch(setPatientsTableSearch(null));
    };
  }, [dispatch]);

  return <SearchTextfield onChange={handleSearchValueChange} />;
};
