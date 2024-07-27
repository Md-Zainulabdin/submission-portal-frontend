import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { useGetWidgetsDataQuery } from "@/redux/api/ApiRoutes";
import { UserRole, widgetDataMap } from "./data";

const DashboardWidget = () => {
  const { authToken } = useAuthContext();
  const { data } = useGetWidgetsDataQuery(authToken?.token ?? "");

  const role = authToken?.user?.role as UserRole;
  const roleData = widgetDataMap[role];

  return (
    <>
      {roleData &&
        roleData.titles.map((title: string, index: number) => {
          const IconComponent = roleData.icons[index];
          const value = Array.isArray(data?.[roleData.dataKeys[index]])
            ? data?.[roleData.dataKeys[index]].length
            : data?.[roleData.dataKeys[index]] ?? 0;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  {title}
                  <span className="text-muted-foreground">
                    <IconComponent />
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <div className="text-2xl font-bold">{value}</div>
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
    </>
  );
};

export default DashboardWidget;
