import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
