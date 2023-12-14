import styled from '@emotion/styled';

import { theme } from '../../styles/theme';

export const ContentWrapper = styled.main`
  display: flex;
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  padding: ${theme.spacing(3)};
  max-width: 2100px;
  min-width: 800px;
  background-color: ${theme.palette.background.default};
  gap: ${theme.spacing(2)};
  position: relative;
`;

export const Header = styled.header`
  height: 70px;
  width: 100%;
  color: ${theme.palette.secondary.contrastText};
  padding: ${theme.spacing(2)};
  display: flex;
  background-color: ${theme.palette.primary.main};
`;

export const HeaderTitle = styled.h1`
  width: 100%;
  text-align: center;
  font-weight: 500;
`;

export const Sidebar = styled.div`
  height: 100%;
  flex: 0 1 180px;
  background-color: ${theme.palette.primary.dark};
  padding: ${theme.spacing(2)};
  font-size: ${theme.spacing(3)};
  color: ${theme.palette.primary.light};
  overflow: auto;
  min-width: 150px;
`;

export const ContentLayout = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
