import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Store from "./pages/Store";
import CourseDetail from "./pages/CourseDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("uid");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/store" element={<Store />} />
          <Route path="/course/:id" element={<CourseDetail />} />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/my-courses" />
              ) : (
                <Auth onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/my-courses"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate to="/login" />
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
