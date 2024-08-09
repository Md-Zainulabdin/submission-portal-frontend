import ProfileDetails from "@/components/dashboard/Profile/details";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tighter">Profile</h1>
      </div>

      <div>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;
