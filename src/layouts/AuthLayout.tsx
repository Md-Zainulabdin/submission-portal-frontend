import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { authToken } = useAuthContext();

  if (authToken?.token) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
