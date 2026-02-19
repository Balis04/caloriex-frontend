import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import OnboardingPage from "./pages/OnboardingPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProfilePage from "./pages/ProfilePage";
import AuthRedirect from "./pages/AuthRedirect";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth-redirect" element={<AuthRedirect />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
