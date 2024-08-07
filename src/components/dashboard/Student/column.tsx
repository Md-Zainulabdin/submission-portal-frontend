import { Student } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const getColumns = (isAdmin: boolean): ColumnDef<Student>[] => {
  const baseColumns: ColumnDef<Student>[] = [
    { accessorKey: "fullname", header: "Fullname" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "course.coursename", header: "Course" },
    { accessorKey: "batch.batchname", header: "Batch" },
  ];

  if (isAdmin) {
    baseColumns.push({
      accessorKey: "action",
      header: "Actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    });
  }

  return baseColumns;
};
