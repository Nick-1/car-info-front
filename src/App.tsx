import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute";
import GroupPage from "./pages/GroupPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>} />
            <Route path="/group" element={
              <PrivateRoute>
                <GroupPage />
              </PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
