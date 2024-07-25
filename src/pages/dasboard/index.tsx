import CardList from "@/components/dashboard/Assignment/card-list";
import { useAuthContext } from "@/context/AuthContext";

const Dashboard = () => {
  const { authToken } = useAuthContext();
  return (
    <div>
      {authToken?.user?.role == "student" && (
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold tracking-tighter">
            Assignments
          </h1>
          <CardList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
