import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalLayout from "./components/GlobalLayout.tsx";
import LoginPage from "./pages/LoginPage";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalLayout>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </GlobalLayout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
