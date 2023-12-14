import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

export const Wrapper = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  width: 300px;
  justify-content: space-between;
  margin-top: ${theme.spacing(1)};
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
`;
