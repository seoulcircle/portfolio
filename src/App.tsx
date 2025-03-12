import AppRoutes from "./Routes";
import { ThemeProvider, Global } from "@emotion/react";
import { theme } from "./Styles/theme";
import { globalStyles } from "./Styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
