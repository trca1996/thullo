import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./Theme";

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  // This defines what 1rem is -- 10px --
  font-size: 62.5%;
}
body {
  box-sizing: border-box;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  color:${({ theme }) => theme.colors.gray1};
  background: ${({ theme }) => theme.colors.white2};
}
`;

export default GlobalStyle;
