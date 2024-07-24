import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { authToken, removeAuthToken } = useAuthContext();
  return (
    <nav className="flex items-center justify-between px-20 py-8">
      <div className="logo">
        <h1 className="font-cal text-3xl md:text-4xl font-bold tracking-tight">
          Saylani / سیلانی
        </h1>
      </div>
      <div className="menu flex items-center gap-4 space-x-4">
        {authToken?.token && (
          <Link
            to="/dashboard"
            className="text-lg font-semibold text-muted-foreground"
          >
            Dashboard
          </Link>
        )}
        {!authToken?.token ? (
          <Link to={"/auth/login"} className="button">
            Login
          </Link>
        ) : (
          <button onClick={() => removeAuthToken()} className="button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
