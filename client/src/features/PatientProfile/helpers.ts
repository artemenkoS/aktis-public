import dayjs from 'dayjs';

import { User } from '../../api/user/types';
import { Visit } from '../../api/visit/types';

export const formatVisitsData = (visits: Visit[], users: User[]) => {
  if (!visits || !users) {
    return [];
  }
  return visits.map((item) => {
    return {
      id: item.id,
      visitDate: dayjs(item.visitDate).format('DD MMMM YYYY HH:mm'),
      doctorId: `${users.find((user) => user.id === item?.doctorId)?.name} ${users.find(
        (user) => user.id === item.doctorId
      )?.surname}`,
      authorId: `${users.find((user) => user.id === item.authorId)?.surname} ${users.find(
        (user) => user.id === item.authorId
      )?.name} `,
      procedure: item?.procedure,
    };
  });
};
