import { Pagination } from '../../types';

export interface Doctor {
  id: number;
  name: string;
  surname: string | null;
}

export interface DoctorDto {
  data: Doctor[];
  pagination: Pagination;
}
