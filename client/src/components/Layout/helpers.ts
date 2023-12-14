import dayjs from 'dayjs';

import { SOS_CONFIG } from './const';

export const prepareNotificationText = (data: string) => {
  const parsedData: Record<string, string> = JSON.parse(data);
  switch (parsedData.type) {
    case 'newVisit':
      return `Новая запись на ${dayjs(parsedData.visitDate).format('HH:mm')}`;
    case 'editVisit':
      return `Изменение в записи на ${dayjs(parsedData.visitDate).format('HH:mm')}`;
    case 'cancelledVisit':
      return `Запись на ${dayjs(parsedData.visitDate).format('HH:mm')} отменена`;
    default:
      return 'Новое уведомление';
    case 'sos':
      return `Требуется помощь в ${SOS_CONFIG[parsedData.message]}`;
  }
};
