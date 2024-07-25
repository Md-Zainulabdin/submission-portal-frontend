import { Assignment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "./cell-action";

// Function to get badge styles based on status
const getBadgeStyles = (status: string) => {
  switch (status) {
    case "open":
      return "border-green-500 text-green-500";
    default:
      return "border-red-500 text-red-500";
  }
};

export const columns: ColumnDef<Assignment>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge variant="outline" className={getBadgeStyles(status)}>
          ● {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    accessorKey: "points",
    header: "Total Points",
  },
  {
    accessorKey: "submissions",
    header: "Total Submissions",
    cell: ({ row }) => {
      const length = row.original.submissions.length;
      return <div>{length}</div>;
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
