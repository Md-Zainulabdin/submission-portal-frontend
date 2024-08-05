import { useState } from "react";
import { Plus, RotateCcw } from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";
import { useGetBatchesQuery } from "@/redux/api/ApiRoutes";

import { columns } from "@/components/dashboard/Batches/column";
import { DataTable } from "@/components/dashboard/Batches/data-table";
import { Button } from "@/components/ui/button";
import BatchModal from "@/components/dashboard/Batches/batch-modal";

const Batches = () => {
  const { authToken } = useAuthContext();
  const [show, setShow] = useState<boolean>(false);

  const { data, refetch } = useGetBatchesQuery(authToken?.token || "");
  return (
    <div>
      <BatchModal isOpen={show} onClose={() => setShow(false)} />
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter">Batches</h1>
          <p></p>
        </div>
        {authToken?.user?.role == "admin" && (
          <div className="flex items-center gap-4">
            <Button onClick={() => refetch()} variant={"outline"} size={"icon"}>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button onClick={() => setShow(true)} className="bg-green-500">
              <span className="mr-2">Create</span>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="py-8">
        <DataTable columns={columns} data={data || []} />
      </div>
    </div>
  );
};

export default Batches;
