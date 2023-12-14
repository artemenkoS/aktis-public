import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { visitDateSelector } from '../../store/slices/visitSlice';
import { setVisitDate } from '../../store/slices/visitSlice';
import { NavigationContainer, Wrapper } from './styled';

export const DaySelect = () => {
  const isoDate = useAppSelector(visitDateSelector);
  const dispatch = useAppDispatch();

  const increaseDate = () => {
    const date = isoDate && new Date(isoDate);
    date && date.setDate(date.getDate() + 1);
    dispatch(setVisitDate(date ? date.toISOString() : null));
  };

  const decreaseDate = () => {
    const date = isoDate && new Date(isoDate);
    date && date.setDate(date.getDate() - 1);
    dispatch(setVisitDate(date ? date.toISOString() : null));
  };

  const onDayChange = (e: Dayjs | null) => {
    dispatch(setVisitDate(e ? e.toISOString() : null));
  };

  return (
    <Wrapper>
      <NavigationContainer>
        <IconButton onClick={decreaseDate}>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton onClick={increaseDate}>
          <ArrowRightIcon />
        </IconButton>
      </NavigationContainer>

      <DatePicker value={isoDate ? dayjs(isoDate) : null} onChange={onDayChange} />
    </Wrapper>
  );
};
