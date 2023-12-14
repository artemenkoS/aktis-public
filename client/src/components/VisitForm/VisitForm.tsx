import { DevTool } from '@hookform/devtools';
import { Button, Checkbox, FormControlLabel, Grid, MenuItem, Modal } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGetDoctorsQuery } from '../../api/doctor/doctorApi';
import { useCreateLogRecordMutation } from '../../api/history/historyApi';
import { useGetRolesQuery } from '../../api/role/rolesApi';
import { Procedure, VisitMutationBody } from '../../api/visit/types';
import { useGetVisitsQuery } from '../../api/visit/visitApi';
import { ExtraProcedureForm } from '../../features/ExtraProcedureForm/ExtraProcedureForm';
import ProceduresTable from '../../features/ProceduresTable/ProceduresTable';
import { getDoctorRole } from '../../helpers/getDoctorRole';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/slices/authSlice';
import {
  editVisitModalSelector,
  setEditableVisit,
  setEditVisitModalOpened,
  setNewVisitModalOpened,
} from '../../store/slices/modalsSlice';
import { selectedSlotSelector, setSelectedSlot, visitDateSelector } from '../../store/slices/visitSlice';
import { LogStatus } from '../../types';
import { FormSelect } from '../FormSelect/FormSelect';
import { Loader } from '../Loader/Loader';
import { PatientAutocomplete } from '../PatientAutocomplete/PatientAutocomplete';
import TimeSlots from '../TimeSlots/TimeSlots';
import { Container } from './styled';
import { VisitFormValues } from './types';

interface Props {
  onSubmit: (body: VisitMutationBody, id?: number) => void;
  values?: Partial<VisitFormValues> | null;
  status: LogStatus;
  isOpen: boolean;
}

export const VisitForm: React.FC<Props> = ({ onSubmit, values, status, isOpen }) => {
  const user = useAppSelector(userSelector);
  const { data: doctors, isLoading: isDoctorsloading } = useGetDoctorsQuery();

  const { data: roles } = useGetRolesQuery();

  const [extraProcedures, setExtraProcedures] = React.useState<Procedure[] | null>(values?.extraProcedures ?? null);

  const doctorRole = React.useMemo(() => getDoctorRole(roles?.data), [roles]);

  const doctor = React.useMemo(() => {
    if (doctorRole) {
      return doctors?.data.find((doctor) => doctor.id === user?.id);
    }
  }, [doctors, user]);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(status === 'edit' ? setEditVisitModalOpened(false) : setNewVisitModalOpened(false));
    dispatch(setEditableVisit(null));
    dispatch(setSelectedSlot(null));
    setExtraProcedures(null);
    resetForm();
  };
  const date = useAppSelector(visitDateSelector);
  const selectedTimeSlot = useAppSelector(selectedSlotSelector);

  const defaultFormValues: VisitFormValues = {
    doctorId: doctor ? doctor.id.toString() : '',
    patient: null,
    procedure: '',
    visitDate: new Date(date ?? ''),
    authorId: '',
    isRemindRequired: false,
    extraProcedures: null,
  };

  const handleExtraProceduresFormSubmit = (data: Procedure) => {
    setExtraProcedures((prev) => (prev ? [...prev, data] : [data]));
  };

  const {
    handleSubmit,
    control,
    watch,
    reset: resetForm,
    formState: { isValid },
  } = useForm<VisitFormValues>({ defaultValues: values ?? defaultFormValues });

  React.useEffect(() => resetForm(values ?? defaultFormValues), [date, values]);
  React.useEffect(() => {
    console.log(values?.extraProcedures);
    values?.extraProcedures && setExtraProcedures(values?.extraProcedures);
  }, [values]);

  const { submitText } = useAppSelector(editVisitModalSelector);

  const [createLogRecordMutate] = useCreateLogRecordMutation();

  const formValues = watch();

  console.log(dayjs.locale());

  useGetVisitsQuery(
    {
      doctorId: formValues.doctorId,
      startDate: dayjs(formValues.visitDate).format('YYYY-MM-DD'),
    },
    { skip: !formValues.doctorId }
  );

  const formSubmit = (data: VisitFormValues) => {
    if (user && data.patient) {
      const time = selectedTimeSlot ? selectedTimeSlot.split(':') : ['0', '0'];
      const visitDate = dayjs(data.visitDate).hour(+time[0]).minute(+time[1]).second(0);

      onSubmit(
        {
          doctorId: +data.doctorId,
          authorId: user.id,
          visitDate: visitDate.toISOString(),
          patientId: +data.patient.id,
          procedure: data.procedure,
          isRemindRequired: data.isRemindRequired,
          extraProcedures: extraProcedures,
        },
        values?.id
      );
      createLogRecordMutate({
        doctorId: +data.doctorId,
        authorId: user.id,
        visitDate: `${data.visitDate.toISOString()}`,
        changes: {
          doctorId: +data.doctorId,
          authorId: user.id,
          visitDate: visitDate.toISOString(),
          patientId: +data.patient.id,
          procedure: data.procedure,
        },
        status: status,
        createdAt: new Date().toISOString(),
      });
      resetForm(defaultFormValues);
      handleClose();
    }
  };

  if (isDoctorsloading) {
    return <Loader />;
  }

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Container>
          <form onSubmit={handleSubmit(formSubmit)} id="visit">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Controller
                  name="doctorId"
                  rules={{ required: 'Доктор не выбран' }}
                  control={control}
                  render={({ field }) => (
                    <FormSelect label="Выберите доктора" onChange={field.onChange} value={field.value}>
                      {doctor ? (
                        <MenuItem value={doctor?.id.toString()}>
                          {doctor.name} {doctor.surname}
                        </MenuItem>
                      ) : (
                        doctors?.data.map((doctor) => (
                          <MenuItem value={doctor.id.toString()} key={doctor.id}>
                            {doctor.name} {doctor.surname}
                          </MenuItem>
                        ))
                      )}
                    </FormSelect>
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name="patient"
                  control={control}
                  rules={{ required: 'Пациент не выбран' }}
                  render={({ field }) => (
                    <PatientAutocomplete label="Выберите пациента" value={field.value} onChange={field.onChange} />
                  )}
                />
              </Grid>
            </Grid>
          </form>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <ExtraProcedureForm formSubmit={handleExtraProceduresFormSubmit} disabled={!doctor} />
            </Grid>
            <Grid item>
              {extraProcedures && extraProcedures.length > 0 && (
                <ProceduresTable
                  disabled={!doctor}
                  procedures={extraProcedures}
                  onDelete={(index) => {
                    const updatedProcedures = extraProcedures.filter((_, i) => i !== index);
                    setExtraProcedures(updatedProcedures);
                  }}
                />
              )}
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Controller
                    name="isRemindRequired"
                    control={control}
                    render={({ field }) => (
                      <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />
                    )}
                  />
                }
                label="Требуется напоминание"
              />
            </Grid>
            <Grid item>
              <Grid container gap={2}>
                <Grid item>
                  <Controller
                    name="visitDate"
                    control={control}
                    render={({ field }) => {
                      return <DatePicker onChange={field.onChange} value={dayjs(field.value).locale('ru')} />;
                    }}
                  />
                </Grid>
                <Grid>
                  <TimeSlots />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Button type="submit" variant="outlined" fullWidth disabled={!isValid || !selectedTimeSlot} form="visit">
                {submitText}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Modal>
      {import.meta.env.DEV && <DevTool control={control} />}
    </div>
  );
};
