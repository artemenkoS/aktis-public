import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import React from 'react';

import { useGetHistoryQuery } from '../../api/history/historyApi';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import { Loader } from '../../components/Loader/Loader';
import { PaginatedTable } from '../../components/PaginatedTable/PaginatedTable';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  historyTableCurrentSortModelSelector,
  historyTablePaginationSelector,
  setHistoryTablePagination,
  setHistoryTableSortModel,
} from '../../store/slices/tablesSlice';
import { formatHistoryData } from './helpers';

export const HistoryTable = () => {
  const pagination = useAppSelector(historyTablePaginationSelector);
  const dispatch = useAppDispatch();

  const sort = useAppSelector(historyTableCurrentSortModelSelector);

  const { data: history, isLoading: isHistoryLoading } = useGetHistoryQuery({
    page: pagination.page + 1 ?? 1,
    pageSize: pagination.pageSize,
    sort: JSON.stringify(sort),
  });

  const { data: users, isLoading: isUsersLoading } = useGetAllUsersQuery();

  const rows = React.useMemo(() => {
    if (history && users) {
      return formatHistoryData(history.data, users?.data);
    }
  }, [history, users]);

  const paginationModel = {
    page: pagination.page - 1,
    pageSize: pagination?.pageSize,
  };

  const onSortModelChange = (e: GridSortModel) => {
    dispatch(setHistoryTableSortModel(e));
  };

  const rowCount = history?.pagination.totalCount;

  const onPaginationModelChange = (e: GridPaginationModel) => {
    dispatch(setHistoryTablePagination(e));
  };

  const columns: GridColDef[] = [
    { field: 'status', headerName: 'Статус', flex: 1 },
    { field: 'authorId', headerName: 'Автор', flex: 1 },
    { field: 'doctorId', headerName: 'Доктор', flex: 1 },
    { field: 'visitDate', headerName: 'Время записи', flex: 1 },
    { field: 'changes', headerName: 'Изменения', flex: 3 },
  ];

  if (isHistoryLoading || isUsersLoading) {
    return <Loader />;
  }

  return (
    rows &&
    pagination && (
      <PaginatedTable
        columns={columns}
        paginationModel={paginationModel}
        rowCount={rowCount ?? 10}
        rows={rows}
        onPaginationChange={onPaginationModelChange}
        onSortModelChange={onSortModelChange}
      />
    )
  );
};
