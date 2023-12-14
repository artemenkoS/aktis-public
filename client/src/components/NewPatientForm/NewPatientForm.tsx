import { Button, Grid, Modal, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { useCreatePatientMutation, useUpdatePatientMutation } from '../../api/patient/patientApi';
import { Patient } from '../../api/patient/types';
import { useAppDispatch } from '../../store/hooks';
import { useAppSelector } from '../../store/hooks';
import { newPatientModalSelector } from '../../store/slices/modalsSlice';
import { setNewPatientModalOpened } from '../../store/slices/modalsSlice';
import { StyledBox } from './styled';

interface FormValues {
  name: string;
  surname: string;
  phone: string;
  address: string;
  birthdate: string;
}

const defaultValues = {
  name: '',
  surname: '',
  phone: '',
  birthdate: '',
  address: '',
};

interface Props {
  values?: Patient;
}

export const NewPatient: React.FC<Props> = ({ values }) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setNewPatientModalOpened(false));
    resetForm();
  };

  const {
    handleSubmit,
    register,
    reset: resetForm,
    formState,
  } = useForm<FormValues>({
    defaultValues: values ?? defaultValues,
  });

  const [createPatient, { isSuccess: createPatientSuccess, reset: resetCreatePatient }] = useCreatePatientMutation();

  const [updatePatient, { isSuccess: updatePatientSuccess, reset: resetUpdatePatient }] = useUpdatePatientMutation();

  const isOpen = useAppSelector(newPatientModalSelector).isOpen;

  React.useEffect(() => {
    if (createPatientSuccess) {
      handleClose();
      resetCreatePatient();
    }
    if (updatePatientSuccess) {
      handleClose();
      resetUpdatePatient();
    }
  }, [createPatientSuccess, updatePatientSuccess]);

  const onCreateSubmit = (data: FormValues) => {
    createPatient({
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      birthdate: data.birthdate,
      address: data.address,
    });
    resetForm();
  };

  const onUpdateSubmit = (data: FormValues) => {
    updatePatient({
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      birthdate: data.birthdate,
      address: data.address,
      id: values?.id ?? 0,
    });
    resetForm();
  };

  return (
    <div>
      <Modal keepMounted open={isOpen} onClose={handleClose}>
        <StyledBox>
          <Grid container direction="column" gap={2}>
            <Grid item>
              <Typography variant="h6">{values ? 'Обновление пациента' : 'Добавление пациента'}</Typography>
            </Grid>
            <form onSubmit={handleSubmit(values ? onUpdateSubmit : onCreateSubmit)}>
              <Grid container direction="column" gap={2}>
                <Grid item>
                  <TextField {...register('surname')} required placeholder="Введите фамилию " fullWidth />
                </Grid>
                <Grid item>
                  <TextField {...register('name')} required placeholder="Введите имя и отчество" fullWidth />
                </Grid>
                <Grid item>
                  <TextField {...register('birthdate')} required placeholder="Введите дату рождения " fullWidth />
                </Grid>
                <Grid item>
                  <TextField {...register('address')} required placeholder="Введите адрес " fullWidth />
                </Grid>

                <Grid item>
                  <TextField
                    {...register('phone', { required: true, pattern: /^(\+7|8)7\d{9}$/ })}
                    required
                    placeholder="Введите номер телефона"
                    fullWidth
                  />
                </Grid>
                <Button type="submit" variant="outlined" fullWidth disabled={!formState.isValid}>
                  {values ? 'Обновить данные' : 'Добавить пациента'}
                </Button>
              </Grid>
            </form>
          </Grid>
        </StyledBox>
      </Modal>
    </div>
  );
};
