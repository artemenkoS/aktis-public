import { Procedure } from '../../api/visit/types';
import { AutocompleteOption } from '../../types';

export interface VisitFormValues {
  visitDate: Date;
  patient: AutocompleteOption | null;
  doctorId: string;
  procedure: string;
  authorId: string;
  id?: number | undefined;
  isRemindRequired: boolean;
  extraProcedures: Procedure[] | null;
}
