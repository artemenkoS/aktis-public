import { Visit } from '../api/visit/types';

export const createPatientsList = (visits: Visit[] | undefined) => {
  if (!visits) {
    return [];
  }
  const patientIdsSet: Set<number> = new Set();
  visits.forEach((visit) => {
    patientIdsSet.add(visit.patientId);
  });
  return Array.from(patientIdsSet);
};
