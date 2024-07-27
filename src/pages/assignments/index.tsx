import { Link } from "react-router-dom";
import { Plus, RotateCcw } from "lucide-react";

import { columns } from "@/components/dashboard/Assignment/column";
import { DataTable } from "@/components/dashboard/Assignment/data-table";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/context/AuthContext";
import { useGetAssignmentsQuery } from "@/redux/api/ApiRoutes";
import CardList from "@/components/dashboard/Assignment/card-list";

const Assignments = () => {
  const { authToken } = useAuthContext();
  const { data, refetch } = useGetAssignmentsQuery(authToken?.token || "");

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">
            Assignments
          </h1>
          <p></p>
        </div>
        {authToken?.user?.role == "teacher" && (
          <div className="flex items-center gap-4">
            <Button onClick={() => refetch()} variant={"outline"} size={"icon"}>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Link to={"/dashboard/assignments/new"}>
              <Button className="bg-green-500">
                <span className="mr-2">Create</span>
                <Plus className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      {authToken?.user?.role == "teacher" && (
        <div className="py-6">
          <DataTable columns={columns} data={data || []} />
        </div>
      )}

      {authToken?.user?.role == "student" && (
        <div className="py-6">
          <CardList />
        </div>
      )}
    </div>
  );
};

export default Assignments;
