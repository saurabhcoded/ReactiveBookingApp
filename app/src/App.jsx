import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManageServices, ServicePage, AllServices } from "@/pages";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { MyBookings } from "./pages/MyBookings";
import { ManageBookings } from "./pages/ManageBookings";
import { Header } from "./components/layout";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllServices />} />
          <Route path="/admin/services" element={<ManageServices />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/bookings/:useremail" element={<MyBookings />} />
          <Route path="/service/:serviceslug" element={<ServicePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
