import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

import { theme } from '../../styles/theme';

export const Link = styled(NavLink)`
  text-decoration: none;
  color: ${theme.palette.secondary.contrastText};
  font-size: 20px;
  border-bottom: 2px solid transparent;
  &.active {
    border-bottom: 2px solid ${theme.palette.primary.main};
  }
`;

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;
