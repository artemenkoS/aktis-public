import { GridColDef, GridEventListener, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import * as React from 'react';

import { useGetPatientsQuery } from '../../api/patient/patientApi';
import { Loader } from '../../components/Loader/Loader';
import { PaginatedTable } from '../../components/PaginatedTable/PaginatedTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPatientProfile, setPatientProfileModalOpened } from '../../store/slices/modalsSlice';
import {
  patientsTableCurrentSortModelSelector,
  patientsTablePaginationSelector,
  patientsTableSearchSelector,
  setPatientsTablePagination,
  setPatientsTableSortModel,
} from '../../store/slices/tablesSlice';
import { PatientSearch } from '../PatientSearch/PatientSearch';

export const AllPatientsTable = () => {
  const pagination = useAppSelector(patientsTablePaginationSelector);
  const search = useAppSelector(patientsTableSearchSelector);
  const dispatch = useAppDispatch();

  const sort = useAppSelector(patientsTableCurrentSortModelSelector);

  const { data: patients, isLoading } = useGetPatientsQuery({
    page: pagination.page + 1 ?? 1,
    pageSize: pagination.pageSize,
    sort: JSON.stringify(sort),
    search: search ?? undefined,
  });

  const rows = patients?.data;
  const totalCount = patients?.pagination.totalCount;

  const paginationModel = {
    page: pagination.page,
    pageSize: pagination?.pageSize,
  };

  const onPaginationModelChange = (e: GridPaginationModel) => {
    dispatch(setPatientsTablePagination(e));
  };

  const onSortModelChange = (e: GridSortModel) => {
    dispatch(setPatientsTableSortModel(e));
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    dispatch(setPatientProfile(params.row.id));
    dispatch(setPatientProfileModalOpened(true));
  };

  React.useEffect(() => {
    return () => {
      dispatch(setPatientsTableSortModel([]));
    };
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: 'surname', headerName: 'Фамилия', flex: 1 },
    { field: 'name', headerName: 'Имя', flex: 1 },
    { field: 'phone', headerName: 'Телефон', flex: 1 },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    rows &&
    pagination && (
      <PaginatedTable
        columns={columns}
        paginationModel={paginationModel}
        rowCount={totalCount ?? 10}
        rows={rows}
        onRowClick={handleRowClick}
        onPaginationChange={onPaginationModelChange}
        onSortModelChange={onSortModelChange}
        slots={{ toolbar: PatientSearch }}
      />
    )
  );
};
