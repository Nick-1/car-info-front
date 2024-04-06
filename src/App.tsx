import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import GlobalLayout from "./components/GlobalLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  )
}

export default App
