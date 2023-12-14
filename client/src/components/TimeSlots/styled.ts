import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

import { theme } from '../../styles/theme';

export const Wrapper = styled.div`
  max-height: 400px;
`;

export const Slot = styled(Button)`
  border: 1px solid black;
  margin: ${theme.spacing(1)};

  text-align: center;
  padding: ${theme.spacing(1)};
  font-size: ${theme.spacing(2)};
  &.selected {
    background-color: ${theme.palette.success.light};
    color: ${theme.palette.secondary.contrastText};
  }
`;

export const StyledBox = styled(Box)`
  width: 400px;
  background-color: ${theme.palette.background.paper};
  padding: ${theme.spacing(3)};
`;
