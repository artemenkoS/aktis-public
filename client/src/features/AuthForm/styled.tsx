import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

export default styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
