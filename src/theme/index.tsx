import { css, keyframes, ThemeProvider } from 'styled-components';

export interface IThemeInterface {
  primaryLightColor: string;
  secondaryLightColor: string;
  primaryDarkColor: string;
  secondaryDarkColor: string;
  messageBackgroundColor: string;
}

export const darkTheme = {
  primaryLightColor: '#e9e9eb',
  secondaryLightColor: '#777',
  primaryDarkColor: '#1e5266',
  secondaryDarkColor: '#111',
  messageBackgroundColor: '#3d3c3c',
};

export const lightTheme = {
  primaryLightColor: '#e9e9eb',
  secondaryLightColor: '#ed7a7a',
  primaryDarkColor: '#da0000',
  secondaryDarkColor: '#7b0000',
  messageBackgroundColor: '#3b1111',
};

export { css, keyframes, ThemeProvider };