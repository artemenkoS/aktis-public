import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import React from 'react';

import { useGetPatientsQuery } from '../../api/patient/patientApi';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import { useGetVisitsQuery } from '../../api/visit/visitApi';
import { Loader } from '../../components/Loader/Loader';
import { PaginatedTable } from '../../components/PaginatedTable/PaginatedTable';
import { createPatientsList } from '../../helpers/createPatientsList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setVisitsTablePagination,
  setVisitsTableSortModel,
  visitsTableCurrentSortModelSelector,
  visitsTablePaginationSelector,
} from '../../store/slices/tablesSlice';
import { formatVisitsData } from './helpers';

export const AllVisitsTable = () => {
  const dispatch = useAppDispatch();

  const pagination = useAppSelector(visitsTablePaginationSelector);
  const sort = useAppSelector(visitsTableCurrentSortModelSelector);

  const { data: visits, isFetching: isVisitsLoading } = useGetVisitsQuery({
    page: pagination.page + 1 ?? 1,
    pageSize: pagination.pageSize,
    sort: JSON.stringify(sort),
  });

  const patientIdsArray = createPatientsList(visits?.data);

  const { data: patients, isFetching: isPatientsLoading } = useGetPatientsQuery(
    { ids: patientIdsArray },
    { skip: !patientIdsArray.length }
  );

  const { data: users } = useGetAllUsersQuery();

  const rows = React.useMemo(() => {
    if (visits && users && patients) {
      return formatVisitsData(visits?.data, users?.data, patients.data);
    }
  }, [visits, users, patients]);

  const totalCount = visits?.pagination?.totalCount;

  const paginationModel = {
    page: pagination.page,
    pageSize: pagination?.pageSize,
  };

  const onPaginationModelChange = (e: GridPaginationModel) => {
    dispatch(setVisitsTablePagination(e));
  };

  const onSortModelChange = (e: GridSortModel) => {
    dispatch(setVisitsTableSortModel(e));
  };

  const columns: GridColDef[] = [
    { field: 'visitDate', headerName: 'Время', flex: 1 },
    { field: 'patientId', headerName: 'Пациент', flex: 1 },
    { field: 'doctorId', headerName: 'Доктор', flex: 1 },
    { field: 'authorId', headerName: 'Автор записи', flex: 1 },
    { field: 'procedure', headerName: 'Процедура', flex: 1 },
  ];

  if (isVisitsLoading || isPatientsLoading || rows?.some((patient) => !patient.patientId)) {
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
        onPaginationChange={onPaginationModelChange}
        onSortModelChange={onSortModelChange}
        loading={isVisitsLoading || isPatientsLoading || rows?.some((patient) => !patient.patientId)}
      />
    )
  );
};
