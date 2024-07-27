import DashboardWidget from "@/components/dashboard/Widgets/dashboard-card";

const Dashboard = () => {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <DashboardWidget />
      </div>
    </section>
  );
};

export default Dashboard;
