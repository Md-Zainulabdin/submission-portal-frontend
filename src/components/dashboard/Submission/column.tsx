import { Submission } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";
import { CellAction } from "./cell-action";

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
    accessorKey: "student.fullname",
    header: "Student",
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
    accessorKey: "updatedAt",
    header: "Submission Date",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return <div>{format(new Date(date), "dd MMMM yyyy")}</div>;
    },
  },
  {
    accessorKey: "url",
    header: "Link",
    cell: ({ row }) => {
      const url = row.original.url;
      return (
        <div>
          <Link to={url} target="_blank">
            <SquareArrowOutUpRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
