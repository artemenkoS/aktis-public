import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { useGetDoctorsQuery } from '../../api/doctor/doctorApi';
import { useGetVisitsQuery } from '../../api/visit/visitApi';
import { DaySelect } from '../../components/DaySelector/DaySelect';
import { HourSlots } from '../../components/HourSlots/HourSlots';
import { Loader } from '../../components/Loader/Loader';
import { useAppSelector } from '../../store/hooks';
import { visitDateSelector } from '../../store/slices/visitSlice';
import { VisitsContainer, VisitsWrapper, Wrapper } from './styled';

export const VisitsList = () => {
  const date = useAppSelector(visitDateSelector);

  const {
    data: visits,
    isFetching: isVisitsLoading,
    isError,
  } = useGetVisitsQuery({
    startDate: dayjs(date).format('YYYY-MM-DD'),
    sort: JSON.stringify([{ field: 'visitDate', sort: 'asc' }]),
  });
  const { data: doctors } = useGetDoctorsQuery();

  if (isVisitsLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error('Не удалось загрузить список записей.');
  }

  if (!visits?.data) {
    return (
      <>
        <DaySelect />
        <Typography
          variant="h4"
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {visits?.message}
        </Typography>
      </>
    );
  }

  return (
    <Wrapper>
      <DaySelect />
      <VisitsContainer>
        {doctors?.data.map((doctor) => {
          const filteredVisits = visits.data.filter((el) => el.doctorId === doctor.id);
          if (filteredVisits.length > 0) {
            return (
              <div key={doctor.id} style={{ maxWidth: 380 }}>
                <Typography variant="h6">
                  {doctor.name} {doctor.surname}
                </Typography>

                <VisitsWrapper>
                  <HourSlots visits={filteredVisits} />
                </VisitsWrapper>
              </div>
            );
          }
          return null;
        })}
      </VisitsContainer>
    </Wrapper>
  );
};
