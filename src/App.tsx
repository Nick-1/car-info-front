import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import HostsListPage from './pages/HostsListPage';
import TopVehicleListPage from './pages/TopVehiclesListPage';
import MyCarsPage from './pages/MyCarsPage';
import MyHostListPage from './pages/MyHostListPage';
import HostDetailStatisticPage from './pages/HostDetailStatisticPage';
import VehicleDetailStatisticPage from './pages/VehicleDetailStatisticPage';
import DailyPricingPage from './pages/DailyPricingPage';
import DailyPricingMyCarsPage from './pages/DailyPricingMyCarsPage';
import DailyPricingMyHostPage from './pages/DailyPricingMyHostPage';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import {CountryCode} from './enums/countries.ts';
import {getCountryNameByCode} from './helpers';

function App() {
    const countryCode = localStorage.getItem('country') || CountryCode.CA;
    const defaultCountry = getCountryNameByCode(countryCode as CountryCode);

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/" element={<Navigate to={`/${defaultCountry}`} replace />} />

                    <Route
                        element={
                            <PrivateRoute>
                                <Outlet />
                            </PrivateRoute>
                        }
                    >
                        <Route path=":countryName">
                            <Route index element={<HostsListPage />} />
                            <Route path="home" element={<HomePage />} />
                            <Route
                                path="top-vehicles-by-unavailable-days"
                                element={<TopVehicleListPage />}
                            />
                            <Route path="my-cars" element={<MyCarsPage />} />
                            <Route path="my-hosts" element={<MyHostListPage />} />
                            <Route path="host/:hostId" element={<HostDetailStatisticPage />} />
                            <Route
                                path="vehicle/:vehicleId"
                                element={<VehicleDetailStatisticPage />}
                            />
                            <Route path="daily-pricing" element={<DailyPricingPage />} />
                            <Route
                                path="daily-pricing-my-cars"
                                element={<DailyPricingMyCarsPage />}
                            />
                            <Route
                                path="daily-pricing/host/:hostId"
                                element={<DailyPricingMyHostPage />}
                            />
                            <Route
                                path="daily-pricing-research-1"
                                element={<DailyPricingPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
