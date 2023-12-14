import { LogStatus } from '../../types';
import { Visit } from '../visit/types';

export interface LogRecord {
  id: number;
  authorId: number;
  doctorId: number;
  visitDate: string;
  changes: Partial<Visit> | null;
  status: LogStatus;
  createdAt: string;
}

export interface HistoryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
}
