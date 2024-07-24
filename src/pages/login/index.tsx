import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-[#f4f4f4] relative">
      <div className="logo absolute top-20 flex items-center justify-center w-full">
        <Link to={"/"}>
          <h1 className="font-cal text-3xl md:text-4xl font-bold tracking-tight">
            Saylani / سیلانی
          </h1>
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
