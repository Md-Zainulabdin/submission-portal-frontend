import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  deadline: string;
  status: string;
  url: string;
}

const AssignmentCard: React.FC<Props> = ({
  title,
  description,
  deadline,
  url,
  status,
}) => {
  return (
    <Link to={`/dashboard/assignments/details/${url}`} key={title}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="line-clamp-1 max-w-sm">
                {description}
              </CardDescription>
            </div>
            <div>
              <Badge
                variant={"outline"}
                className={`${
                  status === "open"
                    ? "border-green-500 text-green-500"
                    : "border-red-500 text-red-500"
                }`}
              >
                ● {status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardFooter>
          <span className="text-muted-foreground">
            Deadline:{" "}
            <span className="font-semibold text-black">{deadline}</span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AssignmentCard;
