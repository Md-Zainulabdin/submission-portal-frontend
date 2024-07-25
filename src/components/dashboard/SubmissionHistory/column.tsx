import { Submission } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Function to get badge styles based on status
const getBadgeStyles = (status: string) => {
  switch (status) {
    case "approved":
      return "border-green-500 text-green-500";
    case "pending":
      return "border-orange-500 text-orange-500";
    default:
      return "border-red-500 text-red-500";
  }
};

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "assignment.title",
    id: "assignmentTitle",
    header: "Assignment",
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
    accessorKey: "isSeen",
    header: "Seen",
    cell: ({ row }) => {
      const seen = row.original.isSeen;
      return <div>{seen ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Submission Date",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return <div>{format(new Date(date), "dd MMMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "-",
    header: "Marks",
    cell: ({ row }) => {
      const totalMarks = row.original.assignment.points;
      const obtainedMarks = row.original.points;
      return <div>{`${obtainedMarks ?? "-"} / ${totalMarks}`}</div>;
    },
  },
  {
    accessorKey: "feedback",
    header: "Feedback",
  },
];
