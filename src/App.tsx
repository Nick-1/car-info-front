import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute";
import DailyPricingPage from './pages/DailyPricingPage';
import VehicleDetailStatisticPage from './pages/VehicleDetailStatisticPage';
import HostDetailStatisticPage from './pages/HostDetailStatisticPage';
import HostsListPage from './pages/HostsListPage';
import TopVehicleListPage from './pages/TopVehiclesListPage';
import MyCarsPage from './pages/MyCarsPage';
import DailyPricingMyCarsPage from './pages/DailyPricingMyCarsPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/home" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>}
            />
            <Route path="/" element={
              <PrivateRoute>
                  <HostsListPage />
              </PrivateRoute>}
            />
            <Route path="/top-vehicles-by-unavailable-days" element={
              <PrivateRoute>
                  <TopVehicleListPage />
              </PrivateRoute>}
            />
            <Route path="/my-cars" element={
              <PrivateRoute>
                <MyCarsPage />
              </PrivateRoute>}
            />
            <Route path="/host/:hostId" element={
              <PrivateRoute>
                  <HostDetailStatisticPage />
              </PrivateRoute>}
            />
            <Route path="/vehicle/:vehicleId" element={
              <PrivateRoute>
                  <VehicleDetailStatisticPage />
              </PrivateRoute>}
            />
            <Route path="/daily-pricing" element={
                <PrivateRoute>
                    <DailyPricingPage />
                </PrivateRoute>}
            />
            <Route path="/daily-pricing-my-cars" element={
                <PrivateRoute>
                    <DailyPricingMyCarsPage />
                </PrivateRoute>}
            />
            <Route path="/daily-pricing-research-1" element={
              <PrivateRoute>
                  <DailyPricingPage />
              </PrivateRoute>}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
