import { css } from '@mui/material/styles';

export const globalStyle = () => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;

    font-family: 'Nunito';
    font-weight: 400;
    overflow: hidden;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0 100px #fff;
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border: 1px solid #d5d5d5;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0;
    background: #eeeeee;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background: #b0b0b0;
  }
`;
