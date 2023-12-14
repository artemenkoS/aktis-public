import dayjs from 'dayjs';

export const getTodayDate = () => {
  const currentDate = new Date();
  const formattedDate = dayjs(currentDate).format('YYYY-MM-DD');

  return formattedDate;
};
