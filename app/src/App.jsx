import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ServicePage } from "@/pages";
import { createTheme } from "./theme";
import {ThemeProvider} from "@mui/material";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ServicePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
