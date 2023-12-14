import * as React from 'react';

import { useGetFormatedPatientQuery } from '../../api/patient/patientApi';
import { VisitMutationBody } from '../../api/visit/types';
import { useUpdateVisitMutation } from '../../api/visit/visitApi';
import { VisitForm } from '../../components/VisitForm/VisitForm';
import { parseDate } from '../../helpers/parseDate';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';
import { editVisitModalSelector } from '../../store/slices/modalsSlice';
import { resetSlots, setSelectedSlot } from '../../store/slices/visitSlice';

export const EditVisit = () => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetSlots());
  };
  const visit = useAppSelector(editVisitModalSelector).editableVisit;
  const { data: patient } = useGetFormatedPatientQuery(visit?.patientId?.toString() || '', {
    skip: !visit,
  });
  const date = parseDate(visit?.visitDate ?? '');

  React.useEffect(() => {
    date && dispatch(setSelectedSlot(date?.time));
  }, [date]);

  const isOpen = useAppSelector(editVisitModalSelector).isOpen;

  const [updateVisit, { isSuccess: createVisitSuccess, reset }] = useUpdateVisitMutation();

  React.useEffect(() => {
    if (createVisitSuccess) {
      reset();
      handleClose();
    }
  }, [createVisitSuccess]);

  const handleSubmit = (body: VisitMutationBody, id?: number) => {
    id && updateVisit({ body, id });
  };
  return (
    visit &&
    patient &&
    date && (
      <VisitForm
        onSubmit={handleSubmit}
        values={{
          ...visit,
          patient: patient,
          doctorId: visit.doctorId.toString(),
          procedure: visit.procedure,
          authorId: visit.authorId.toString(),
          isRemindRequired: visit.isRemindRequired,
          visitDate: new Date(date?.date),
          extraProcedures: visit.extraProcedures,
        }}
        status="edit"
        isOpen={isOpen}
      />
    )
  );
};
