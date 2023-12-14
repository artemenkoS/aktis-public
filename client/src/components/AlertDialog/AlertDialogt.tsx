import { Button, Modal, Typography } from '@mui/material';
import * as React from 'react';

import { useAppSelector } from '../../store/hooks';
import { deleteVisitModalSelector } from '../../store/slices/modalsSlice';
import { ButtonWrapper, Container } from './styled';

interface Props {
  onClick: () => void;
  handleClose: () => void;
  cancelText?: string;
  submitText?: string;
  dialogText: string;
}

export const AlertDialog: React.FC<Props> = ({
  onClick,
  cancelText = 'Отменить',
  submitText = 'Подтвердить',
  dialogText,
  handleClose,
}) => {
  const modalState = useAppSelector(deleteVisitModalSelector);

  return (
    <div>
      <Modal keepMounted open={modalState.isOpen} onClose={handleClose}>
        <Container>
          <Typography variant="h6">{dialogText}</Typography>
          <ButtonWrapper>
            <Button variant="outlined" size="large" onClick={handleClose}>
              {cancelText}
            </Button>
            <Button type="submit" variant="contained" color="error" onClick={onClick}>
              {submitText}
            </Button>
          </ButtonWrapper>
        </Container>
      </Modal>
    </div>
  );
};
