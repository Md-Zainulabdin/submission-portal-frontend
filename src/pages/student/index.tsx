import { columns } from "@/components/dashboard/Student/column";
import { DataTable } from "@/components/dashboard/Student/data-table";
import { useAuthContext } from "@/context/AuthContext";
import { useGetStudentsQuery } from "@/redux/api/ApiRoutes";

const Student = () => {
  const { authToken } = useAuthContext();

  const { data } = useGetStudentsQuery(authToken?.token || "");
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">Students</h1>
        <p></p>
      </div>

      <div className="py-8">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Student;
