import { useState } from "react";
import { Submission } from "@/types";
import { MoreHorizontal, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateModal from "./update-modal";

interface CellActionProps {
  data: Submission;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UpdateModal
        isOpen={open}
        onClose={() => setOpen(false)}
        id={data?._id}
        status={data?.status}
        feedback={data?.feedback}
        points={data?.points}
        rejectionReason={data?.rejectionReason}
        total_points={data?.assignment?.points}
        canResubmit={data?.canResubmit}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0" size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1 pb-2">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <SquarePen className="mr-3 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
