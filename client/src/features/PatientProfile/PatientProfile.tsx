import {
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useGetOnePatientQuery } from '../../api/patient/patientApi';
import { useGetAllUsersQuery } from '../../api/user/userApi';
import { useGetVisitsQuery } from '../../api/visit/visitApi';
import { EditButton } from '../../components/EditButton/EditButton';
import { Loader } from '../../components/Loader/Loader';
import { NewPatient } from '../../components/NewPatientForm/NewPatientForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  patientProfileModalSelector,
  setNewPatientModalOpened,
  setPatientProfile,
  setPatientProfileModalOpened,
} from '../../store/slices/modalsSlice';
import { NewVisit } from '../NewVisit/NewVisit';
import { NewVisitButton } from '../NewVisit/NewVisitButton';
import { formatVisitsData } from './helpers';
import { Container } from './styled';

export const PatientProfile = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(patientProfileModalSelector);
  const {
    data: patient,
    isLoading: isPatientLoading,
    isFetching: isPatientFetching,
  } = useGetOnePatientQuery(state.patientId ?? 0, { skip: !state.patientId });

  const {
    data: visits,
    isLoading: isVisitsLoading,
    isFetching: isVisitsFetching,
  } = useGetVisitsQuery({ patientId: state.patientId?.toString() }, { skip: !state.patientId });

  const { data: users } = useGetAllUsersQuery();

  const handleClose = () => {
    dispatch(setPatientProfileModalOpened(false));
    dispatch(setPatientProfile(null));
  };

  const handleEditPatient = () => {
    dispatch(setNewPatientModalOpened(true));
  };

  const visitsData = formatVisitsData(visits?.data ?? [], users?.data ?? []);

  console.log(patient?.data);

  return (
    <>
      <Modal open={state.isOpen} onClose={handleClose}>
        <Container>
          {isPatientLoading || isPatientFetching || isVisitsLoading || isVisitsFetching ? (
            <Loader />
          ) : (
            <Grid container gap={2} direction="column">
              <Grid item>
                <Grid container direction="row" alignItems="center" gap={1}>
                  <Grid item>
                    <Typography variant="h5">
                      {patient?.data.name} {patient?.data.surname}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <EditButton onClick={handleEditPatient} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Номер телефона: {patient?.data.phone}</Typography>
              </Grid>
              <Typography>История посещений</Typography>
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Дата</TableCell>
                      <TableCell>Процедура</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visitsData.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell>{visit.visitDate}</TableCell>
                        <TableCell>{visit.procedure}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <NewVisitButton />
            </Grid>
          )}
          {!isPatientLoading && !isPatientFetching && patient?.data && <NewPatient values={patient.data} />}

          {!isPatientLoading && !isPatientFetching && patient?.data && (
            <NewVisit
              values={{
                patient: { id: patient.data.id, label: `${patient.data.name} ${patient.data.surname}` },
                visitDate: new Date(),
              }}
            />
          )}
        </Container>
      </Modal>
    </>
  );
};
