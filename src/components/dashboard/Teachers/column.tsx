import { Teacher } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "fullname",
    header: "Fullname",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "course.coursename",
    header: "Course",
  },
  {
    accessorKey: "batch.batchname",
    header: "Batch",
  },
  {
    accessorKey: "batch.time",
    header: "Batch Time",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
