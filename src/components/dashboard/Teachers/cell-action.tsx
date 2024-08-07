import { useState } from "react";
import { Teacher } from "@/types";
import axiosInstance from "@/axios";
import toast from "react-hot-toast";
import { MoreHorizontal, SquarePen, Trash } from "lucide-react";

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
import { useGetTeachersQuery } from "@/redux/api/ApiRoutes";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: Teacher;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { authToken } = useAuthContext();
  const { refetch } = useGetTeachersQuery(authToken?.token || "");

  const onDeleteHandler = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/teacher/delete/${data._id}`,
        {
          headers: {
            Authorization: `${authToken?.token}`,
          },
        }
      );

      if (response.status == 200) {
        toast.success("Teacher Deleted");
        setOpen(false);
        refetch();
      }
    } catch (error) {
      console.log("Form-Error", error);
      toast.error("Something went wrong!");
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
        <DropdownMenuContent
          align="end"
          className="w-[180px] space-y-1 px-2 py-2"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              navigate(`/dashboard/teachers/update/${data._id}`);
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
