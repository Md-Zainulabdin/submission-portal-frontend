import { useState } from "react";
import { Assignment } from "@/types";
import axiosInstance from "@/axios";
import { MoreHorizontal, SquarePen, Trash, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modal/AlertModal";

import { useAuthContext } from "@/context/AuthContext";
import { useGetAssignmentsQuery } from "@/redux/api/ApiRoutes";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: Assignment;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const naivgate = useNavigate();

  const { authToken } = useAuthContext();
  const { refetch } = useGetAssignmentsQuery(authToken?.token || "");

  const onDeleteHandler = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/assignment/${data._id}`, {
        headers: {
          Authorization: `${authToken?.token}`,
        },
      });

      if (response.status == 200) {
        // toast.success("Assignment Deleted");
        setOpen(false);
        refetch();
      }
    } catch (error) {
      console.log("Form-Error", error);
    //   toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDeleteHandler}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0" size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1 px-3">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              naivgate(`/dashboard/submissions/${data?._id}`);
            }}
          >
            <Users className="mr-3 h-4 w-4" />
            Submissions
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              naivgate(`/dashboard/assignments/update/${data?._id}`);
              setOpen(true);
            }}
          >
            <SquarePen className="mr-3 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-3 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
