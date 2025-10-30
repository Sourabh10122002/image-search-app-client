import { useEffect, useState, type ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import AuthSuccess from "./pages/AuthSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <SearchPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

interface RequireAuthProps {
  children: ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/auth/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthed(Boolean(data.ok));
        setLoading(false);
      })
      .catch(() => {
        setAuthed(false);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </div>
      </div>
    );

  if (!authed) return <Navigate to="/login" replace />;

  return <>{children}</>;
}