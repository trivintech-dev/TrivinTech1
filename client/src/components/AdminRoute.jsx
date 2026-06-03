import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { token, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="py-12 text-center">Loading...</div>;
  }

  if (!token || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
