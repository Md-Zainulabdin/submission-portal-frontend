import { columns } from "@/components/dashboard/SubmissionHistory/column";
import { DataTable } from "@/components/dashboard/SubmissionHistory/data-table";
import { useAuthContext } from "@/context/AuthContext";
import { useGetSubmissionHistoryQuery } from "@/redux/api/ApiRoutes";

const SubmissionHistory = () => {
  const { authToken } = useAuthContext();

  const { data } = useGetSubmissionHistoryQuery(authToken?.token ?? "");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">
          Submission History
        </h1>
      </div>

      <div>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
};

export default SubmissionHistory;
