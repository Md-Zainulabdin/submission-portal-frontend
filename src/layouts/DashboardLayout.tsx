import { Link, Navigate, Outlet } from "react-router-dom";

import Sidebar from "@/components/static/Sidebar";
import Topbar from "@/components/static/Topbar";
import { useAuthContext } from "@/context/AuthContext";

const DashboardLayout = () => {
  const { authToken, removeAuthToken } = useAuthContext();

  if (!authToken?.token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center justify-center border-b px-4 lg:h-[70px] lg:px-6">
            <Link to="/">
              <h1 className="font-cal text-2xl font-bold tracking-tight">
                Saylani / سیلانی
              </h1>
            </Link>
          </div>
          <div className="flex-1">
            <Sidebar />
          </div>
          <div className="mt-auto p-4">
            <button onClick={removeAuthToken} className="button">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
