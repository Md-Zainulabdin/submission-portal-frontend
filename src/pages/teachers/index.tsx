import { Link } from "react-router-dom";
import { Plus, RotateCcw } from "lucide-react";

import { columns } from "@/components/dashboard/Teachers/column";
import { DataTable } from "@/components/dashboard/Teachers/data-table";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/context/AuthContext";
import { useGetTeachersQuery } from "@/redux/api/ApiRoutes";

const Teachers = () => {
  const { authToken } = useAuthContext();
  const { data, refetch } = useGetTeachersQuery(authToken?.token || "");

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">Teachers</h1>
          <p></p>
        </div>
        {authToken?.user?.role == "admin" && (
          <div className="flex items-center gap-4">
            <Button onClick={() => refetch()} variant={"outline"} size={"icon"}>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Link to={"/dashboard/teachers/new"}>
              <Button className="bg-green-500">
                <span className="mr-2">Create</span>
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="py-6">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Teachers;
