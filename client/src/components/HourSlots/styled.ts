import styled from '@emotion/styled';
import { Paper } from '@mui/material';

import { theme } from '../../styles/theme';

export const VisitTime = styled.span`
  font-weight: 00;
  //   border: 2px solid black;
  //   border-radius: ${theme.spacing(1)};
  padding: ${theme.spacing(0.3)};
`;

export const Slot = styled(Paper)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1)};
  margin-bottom: ${theme.spacing(0.6)};
  padding: ${theme.spacing(1.3)};
  height: 30px;
`;

export const ControlsContainer = styled.div`
  display: flex;
  margin-left: auto;
`;

export const PatientSurname = styled.span`
  cursor: pointer;
`;
