import { DeleteVisitModal } from '../features/DeleteVisitModal/DeleteVisitModal';
import { EditVisit } from '../features/EditVisit/EditVisit';
import { NewVisit } from '../features/NewVisit/NewVisit';
import { NewVisitButton } from '../features/NewVisit/NewVisitButton';
import { PatientProfile } from '../features/PatientProfile/PatientProfile';
import { VisitsList } from '../features/VisitsList/VisitsList';

export const MainScreen = () => {
  return (
    <>
      <VisitsList />
      <NewVisitButton />
      <NewVisit values={null} />
      <EditVisit />
      <DeleteVisitModal />
      <PatientProfile />
    </>
  );
};
