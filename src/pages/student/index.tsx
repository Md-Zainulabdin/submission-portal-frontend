import { getColumns } from "@/components/dashboard/Student/column";
import { DataTable } from "@/components/dashboard/Student/data-table";
import { useAuthContext } from "@/context/AuthContext";
import {
  useGetAllStudentsQuery,
  useGetStudentsQuery,
} from "@/redux/api/ApiRoutes";

const Student = () => {
  const { authToken } = useAuthContext();
  const userRole = authToken?.user?.role;

  const { data: teacherStudents } = useGetStudentsQuery(authToken?.token || "");
  const { data: allStudents } = useGetAllStudentsQuery(authToken?.token || "");

  const data = userRole === "admin" ? allStudents : teacherStudents;

  const columns = getColumns(userRole === "admin");

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">Students</h1>
      </div>

      <div className="py-8">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Student;
