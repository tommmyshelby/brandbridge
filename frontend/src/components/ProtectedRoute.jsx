import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element }) {
  const user = useSelector((state) => state.auth.user); // Adjust the path according to your Redux setup

  return user ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;