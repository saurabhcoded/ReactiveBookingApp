import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManageServices, ServicePage, AllServices } from "@/pages";
import { createTheme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { MyBookings } from "./pages/MyBookings";
import { ManageBookings } from "./pages/ManageBookings";
import { Header } from "./components/layout";
import { StripePay } from "./components/payment/stripe/StripePay";
import StoreProvider from "./store/StoreProvider";
import DashboardRoutes from "./Routes/DashboardRoutes";

function App() {
  const theme = createTheme();
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AllServices />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/bookings/:useremail" element={<MyBookings />} />
            <Route path="/service/:serviceslug" element={<ServicePage />} />
            <Route path="/payment/*" element={<StripePay />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
