import dayjs from 'dayjs';

import { LogRecord } from '../../api/history/types';
import { User } from '../../api/user/types';

const STATUSES = {
  create: 'Cоздание',
  edit: 'Изменение',
  delete: 'Удаление',
};

export const formatHistoryData = (history: LogRecord[], users: User[]) => {
  if (!history || !users) {
    return [];
  }
  return history.map((item) => ({
    id: item.id,
    visitDate: dayjs(item.visitDate).format('DD MMMM HH:mm'),
    doctorId: `${users.find((user) => user.id === item.doctorId)?.name} ${
      users.filter((user) => user.id === item.doctorId)[0].surname
    }`,
    authorId: `${users.find((user) => user.id === item.authorId)?.name} ${users.find(
      (user) => user.id === item.authorId
    )?.surname}`,
    changes: JSON.stringify(item.changes, null, 2),
    status: STATUSES[item.status],
  }));
};
