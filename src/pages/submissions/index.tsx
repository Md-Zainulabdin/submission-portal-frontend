import { RotateCcw } from "lucide-react";
import { useParams } from "react-router-dom";

import { columns } from "@/components/dashboard/Submission/column";
import { DataTable } from "@/components/dashboard/Submission/data-table";
import { Button } from "@/components/ui/button";

import { useAuthContext } from "@/context/AuthContext";
import { useGetSubmissionsByAssignmentIdQuery } from "@/redux/api/ApiRoutes";

const Submissions = () => {
  const { id } = useParams();
  const { authToken } = useAuthContext();

  const { data, refetch } = useGetSubmissionsByAssignmentIdQuery({
    token: authToken?.token ?? "",
    id: id ?? "",
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tighter">Submissions</h1>

        <Button onClick={() => refetch()} variant={"outline"} size={"icon"}>
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="py-8">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Submissions;
