// src/components/ProtectedRoute.jsx
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "@tanstack/react-router";

export function ProtectedRoute({ children }) {
  const { loading } = useAuth();

  // const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return children;
}
