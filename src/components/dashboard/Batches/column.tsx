import { Batch } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Batch>[] = [
  {
    header: "S.No",
    accessorFn: (_, rowIndex) => rowIndex + 1,
    id: "serialNo",
  },
  {
    accessorKey: "batchname",
    header: "Batch",
  },
  {
    accessorKey: "batchcode",
    header: "Batch Code",
  },
  {
    accessorKey: "course.coursename",
    header: "Course",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
