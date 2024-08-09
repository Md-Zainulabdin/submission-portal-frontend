import { useAuthContext } from "@/context/AuthContext";
import { useGetUserByIdQuery } from "@/redux/api/ApiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileDetails = () => {
  const { authToken } = useAuthContext();

  const { data, isLoading } = useGetUserByIdQuery({
    token: authToken?.token ?? "",
    id: authToken?.user?.id ?? "",
  });

  const userRoleIsAdmin = authToken?.user?.role === "admin";

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        <ProfileItem
          label="Name"
          value={data?.fullname}
          isLoading={isLoading}
        />
        <ProfileItem label="Email" value={data?.email} isLoading={isLoading} />

        {!userRoleIsAdmin && (
          <>
            <ProfileItem
              label="Gender"
              value={data?.gender}
              isLoading={isLoading}
            />
            <ProfileItem
              label="CNIC"
              value={data?.cnic}
              isLoading={isLoading}
            />
            <ProfileItem
              label="City"
              value={data?.course?.city}
              isLoading={isLoading}
            />
            <ProfileItem
              label="Course"
              value={data?.course?.coursename}
              isLoading={isLoading}
            />
            <ProfileItem
              label="Batch"
              value={data?.batch?.batchname}
              isLoading={isLoading}
            />
            <ProfileItem
              label="Batch Time"
              value={data?.batch?.time}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface Props {
  label: string;
  value: string | undefined;
  isLoading: boolean;
}

const ProfileItem: React.FC<Props> = ({ label, value, isLoading }) => (
  <div className="flex flex-col">
    <h2 className="text-lg font-semibold">{label} :</h2>
    {isLoading ? (
      <Skeleton className="w-[120px] h-[20px] rounded-full" />
    ) : (
      <p className="text-lg text-muted-foreground">{value || "N/A"}</p>
    )}
  </div>
);

export default ProfileDetails;
