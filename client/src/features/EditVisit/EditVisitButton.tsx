import { Visit } from '../../api/visit/types';
import { EditButton } from '../../components/EditButton/EditButton';
import { useAppDispatch } from '../../store/hooks';
import { setEditableVisit, setEditVisitModalOpened, setEditVisitModalSubmitText } from '../../store/slices/modalsSlice';

interface Props {
  visit: Visit;
  disabled?: boolean;
}

export const EditVisitButton: React.FC<Props> = ({ visit, disabled }) => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setEditableVisit(visit));
    dispatch(setEditVisitModalOpened(true));
    dispatch(setEditVisitModalSubmitText('Изменить запись'));
  };
  return <EditButton onClick={onClick} disabled={disabled} />;
};
