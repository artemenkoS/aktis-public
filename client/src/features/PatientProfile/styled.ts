import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { theme } from '../../styles/theme';

export const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  overflow: hidden;
  background-color: ${theme.palette.background.paper};
  padding: ${theme.spacing(3)};
  border-radius: ${theme.spacing(1)};
`;
