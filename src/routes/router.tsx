import { createBrowserRouter } from "react-router-dom";

// import pages
import App from "@/App";
import Login from "@/pages/login";
import AuthLayout from "@/layouts/AuthLayout";

import DashboardLayout from "@/layouts/DashboardLayout";
import Dashboard from "@/pages/dasboard";
import Student from "@/pages/student";
import Assignments from "@/pages/assignments";
import NewAssignment from "@/pages/assignments/new";
import UpdateAssignment from "@/pages/assignments/update";
import Submissions from "@/pages/submissions";
import SubmissionHistory from "@/pages/submissions-history";
import AssignmentDetails from "@/pages/assignments/details";
import StudentRegister from "@/pages/student/register";
import Courses from "@/pages/courses";
import Batches from "@/pages/batches";
import Teachers from "@/pages/teachers";
import CreateTeacher from "@/pages/teachers/new";
import UpdateTeacher from "@/pages/teachers/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/students",
        element: <Student />,
      },
      {
        path: "/dashboard/assignments",
        element: <Assignments />,
      },
      {
        path: "/dashboard/assignments/new",
        element: <NewAssignment />,
      },
      {
        path: "/dashboard/assignments/update/:id",
        element: <UpdateAssignment />,
      },
      {
        path: "/dashboard/assignments/details/:id",
        element: <AssignmentDetails />,
      },
      {
        path: "/dashboard/submissions/:id",
        element: <Submissions />,
      },
      {
        path: "/dashboard/submission-history",
        element: <SubmissionHistory />,
      },
      {
        path: "/dashboard/courses",
        element: <Courses />,
      },
      {
        path: "/dashboard/batches",
        element: <Batches />,
      },
      {
        path: "/dashboard/teachers",
        element: <Teachers />,
      },
      {
        path: "/dashboard/teachers/new",
        element: <CreateTeacher />,
      },
      {
        path: "/dashboard/teachers/update/:id",
        element: <UpdateTeacher />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <StudentRegister />,
      },
    ],
  },
]);

export default router;
