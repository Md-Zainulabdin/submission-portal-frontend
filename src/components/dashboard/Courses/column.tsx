import { Course } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Course>[] = [
  {
    header: "S.No",
    accessorFn: (_, rowIndex) => rowIndex + 1,
    id: "serialNo",
  },
  {
    accessorKey: "coursename",
    header: "Course",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
