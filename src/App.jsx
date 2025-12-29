import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import DashboardCopy from "./pages/Dashboardcopy";
import CourseDetail from "./pages/CourseDetail";
import ProtectedRoute from "./ProtectedRoute";
import LearningHub from "./pages/LearningHub";
import SecurityProvider from "./Provider/SecureProvider";
import Navbar from "./components/Navbar";

// Assuming LearningHub is imported or defined
// import LearningHub from "./pages/LearningHub"; 

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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("uid");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    // <SecurityProvider>
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <Navbar onLogout={handleLogout} isAuthenticated={isAuthenticated} />

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Store />} />
          <Route path="/course/:id" element={<CourseDetail />} />

          {/* Login Route: Redirects to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/my-courses" replace /> : <Auth onLogin={() => setIsAuthenticated(true)} />
            }
          />

          {/* Protected Routes: Wrapped in ProtectedRoute component */}
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <DashboardCopy />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learning-hub/:coursename"
            element={
              <ProtectedRoute>
                <LearningHub />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
    // </SecurityProvider>
  );
}

export default App;