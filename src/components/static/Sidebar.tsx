import { useAuthContext } from "@/context/AuthContext";
import {
  CalendarCheck2,
  Command,
  GalleryHorizontalEnd,
  Lock,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { authToken } = useAuthContext();
  return (
    <div>
      <nav className="grid items-start gap-4 px-2 text-sm font-medium lg:px-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => {
            return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              isActive && "bg-muted text-primary"
            }`;
          }}
        >
          <Command className="h-4 w-4" />
          Dashboard
        </NavLink>

        {authToken?.user?.role == "teacher" && (
          <>
            <NavLink
              to="/dashboard/students"
              className={({ isActive }) => {
                return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive && "bg-muted text-primary"
                }`;
              }}
            >
              <Users className="h-4 w-4" />
              Students
            </NavLink>

            <NavLink
              to="/dashboard/assignments"
              className={({ isActive }) => {
                return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive && "bg-muted text-primary"
                }`;
              }}
            >
              <CalendarCheck2 className="h-4 w-4" />
              Assignments
            </NavLink>
          </>
        )}

        {authToken?.user?.role == "student" && (
          <>
            <NavLink
              to="/dashboard/submission-history"
              className={({ isActive }) => {
                return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isActive && "bg-muted text-primary"
                }`;
              }}
            >
              <GalleryHorizontalEnd className="h-4 w-4" />
              Submission History
            </NavLink>
          </>
        )}
        <NavLink
          to="/update-password"
          className={({ isActive }) => {
            return `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              isActive && "bg-muted text-primary"
            }`;
          }}
        >
          <Lock className="h-4 w-4" />
          Update Password
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;