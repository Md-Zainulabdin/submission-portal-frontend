import AssignmentCard from "@/components/static/Card";

import { useAuthContext } from "@/context/AuthContext";
import { useGetAssignmentsQuery } from "@/redux/api/ApiRoutes";

const CardList = () => {
  const { authToken } = useAuthContext();

  const { data } = useGetAssignmentsQuery(authToken?.token || "");

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {data?.map((row) => (
          <AssignmentCard
            title={row.title}
            description={row.description}
            deadline={row.deadline}
            status={row.status}
            url={row._id}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
