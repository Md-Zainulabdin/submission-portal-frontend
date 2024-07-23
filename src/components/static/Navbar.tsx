import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b px-12 py-4">
      <div className="logo">
        <h1 className="text-3xl font-bold tracking-tighter">SMIT</h1>
      </div>
      <div className="menu space-x-4">
        <Button asChild>
          <a href={"/auth/login"}>Login</a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
