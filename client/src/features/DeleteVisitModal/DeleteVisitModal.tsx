import * as React from 'react';

import { useCreateLogRecordMutation } from '../../api/history/historyApi';
import { useGetUserQuery } from '../../api/user/userApi';
import { useDeleteVisitMutation } from '../../api/visit/visitApi';
import { AlertDialog } from '../../components/AlertDialog/AlertDialogt';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';
import { deleteVisitModalSelector } from '../../store/slices/modalsSlice';
import { setDeleteVisitId, setDeleteVisitModalOpened } from '../../store/slices/modalsSlice';

export const DeleteVisitModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data: user } = useGetUserQuery();
  const { visit } = useAppSelector(deleteVisitModalSelector);

  const handleClose = () => {
    dispatch(setDeleteVisitModalOpened(false));
    dispatch(setDeleteVisitId(null));
  };

  const handleDeleteVisit = () => {
    if (visit && user) {
      mutate(visit.id);
      createLogRecordMutate({
        authorId: user.user.id,
        doctorId: visit.doctorId,
        visitDate: visit.visitDate,
        changes: null,
        status: 'delete',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const [mutate, { isSuccess: deleteVisitSuccess, reset }] = useDeleteVisitMutation();
  const [createLogRecordMutate] = useCreateLogRecordMutation();

  React.useEffect(() => {
    if (deleteVisitSuccess) {
      reset();
      handleClose();
    }
  }, [deleteVisitSuccess]);

  return (
    <AlertDialog
      dialogText="Вы точно хотите удалить данную запись?"
      onClick={handleDeleteVisit}
      handleClose={handleClose}
    />
  );
};
