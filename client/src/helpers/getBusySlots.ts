import dayjs from 'dayjs';

import { Visit } from '../api/visit/types';
export const getBusySlots = (visits: Visit[] | undefined) => {
  const timeSet = new Set();
  if (!visits) return [];

  visits.forEach((visit) => {
    const visitDate = new Date(visit.visitDate);
    const formattedTime = dayjs(visitDate).format('HH:mm');
    timeSet.add(formattedTime);
  });

  return Array.from(timeSet);
};
