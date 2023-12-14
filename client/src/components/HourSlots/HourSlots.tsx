import CallIcon from '@mui/icons-material/Call';
import { Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { useGetPatientsQuery } from '../../api/patient/patientApi';
import { useGetRolesQuery } from '../../api/role/rolesApi';
import { Visit } from '../../api/visit/types';
import { DeleteVisitButton } from '../../features/DeleteVisitModal/DeleteVisitButton';
import { EditVisitButton } from '../../features/EditVisit/EditVisitButton';
import { createPatientsList } from '../../helpers/createPatientsList';
import { getDoctorRole } from '../../helpers/getDoctorRole';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/slices/authSlice';
import { setPatientProfile, setPatientProfileModalOpened } from '../../store/slices/modalsSlice';
import { HOUR_SLOTS } from './const';
import { ControlsContainer, PatientSurname, Slot, VisitTime } from './styled';

interface HourSlotsProps {
  visits: Visit[];
}

export const HourSlots: React.FC<HourSlotsProps> = ({ visits }) => {
  const groupedVisits: { [hour: string]: Visit[] } = {};

  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);
  const { data: roles } = useGetRolesQuery();
  const doctorRole = React.useMemo(() => getDoctorRole(roles?.data), [roles]);

  const patientIdsArray = createPatientsList(visits);

  const { data: patients } = useGetPatientsQuery({ ids: patientIdsArray });

  visits.forEach((visit) => {
    const hour = new Date(visit.visitDate).getHours().toString().padStart(2, '0');
    console.log(visit, hour);
    if (!groupedVisits[hour]) {
      groupedVisits[hour] = [];
    }
    groupedVisits[hour].push(visit);
  });

  return (
    <Grid container spacing={1}>
      {HOUR_SLOTS.map((hour) => (
        <Grid item xs={12} key={hour}>
          <Paper elevation={4} style={{ padding: '10px', height: '125px', width: '360px' }}>
            <Grid container alignItems="center">
              <Grid item xs={2}>
                <Typography variant="h5">{hour}</Typography>
              </Grid>
              <Grid item xs={10}>
                {groupedVisits[hour]?.map((visit) => {
                  const visitDate = new Date(visit.visitDate);
                  const formattedDate = dayjs(visitDate).format('HH:mm');
                  const patient = patients?.data.find((el) => el.id === visit.patientId);
                  return (
                    patient && (
                      <Slot key={visit.id} elevation={4}>
                        <VisitTime> {formattedDate}</VisitTime>
                        <PatientSurname
                          onClick={() => {
                            dispatch(setPatientProfile(patient.id));
                            dispatch(setPatientProfileModalOpened(true));
                          }}
                        >
                          {patient?.surname}
                        </PatientSurname>
                        {visit.isRemindRequired && <CallIcon color="error" />}
                        <ControlsContainer>
                          <DeleteVisitButton
                            visit={visit}
                            disabled={user?.role === doctorRole?.id && visit.doctorId !== user?.id}
                          />
                          <EditVisitButton
                            visit={visit}
                            disabled={user?.role === doctorRole?.id && visit.doctorId !== user?.id}
                          />
                        </ControlsContainer>
                      </Slot>
                    )
                  );
                })}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default HourSlots;
