import dayjs from 'dayjs';

export const parseDate = (dateTimeString: string) => {
  const dateTime = dayjs(dateTimeString);

  if (!dateTime.isValid()) {
    return;
  }

  const date = dateTime.format('YYYY-MM-DD');
  const time = dateTime.format('HH:mm');

  const result = {
    date: date,
    time: time,
  };

  return result;
};
