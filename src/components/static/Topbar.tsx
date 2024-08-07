import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookPlus,
  Lock,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  User,
  UserCircle,
  Wallet,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthContext } from "@/context/AuthContext";

const Topbar = () => {
  const naivgate = useNavigate();
  const { authToken, removeAuthToken } = useAuthContext();

  return (
    <div>
      <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[70px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col gap-3">
            <div className="mb-4">
              <Link to="/">
                <h1 className="font-cal text-3xl md:text-4xl font-bold tracking-tight">
                  Saylani / سیلانی
                </h1>
              </Link>
            </div>
            <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted text-primary"
                  }`;
                }}
              >
                <Package className="h-4 w-4" />
                Dashboard
              </NavLink>

              {authToken?.user?.role == "Admin" && (
                <>
                  <NavLink
                    to="/members"
                    className={({ isActive }) => {
                      return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && "bg-muted text-primary"
                      }`;
                    }}
                  >
                    <UserCircle className="h-4 w-4" />
                    Members
                  </NavLink>
                  <NavLink
                    to="/payments"
                    className={({ isActive }) => {
                      return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                        isActive && "bg-muted text-primary"
                      }`;
                    }}
                  >
                    <Wallet className="h-4 w-4" />
                    Payments
                  </NavLink>
                </>
              )}

              <NavLink
                to="/forms"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted text-primary"
                  }`;
                }}
              >
                <BookPlus className="h-4 w-4" />
                Forms
              </NavLink>
              {authToken?.user?.role !== "Admin" && (
                <NavLink
                  to="/refferals"
                  className={({ isActive }) => {
                    return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                      isActive && "bg-muted text-primary"
                    }`;
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Referrel
                </NavLink>
              )}
              <NavLink
                to="/update-password"
                className={({ isActive }) => {
                  return `flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground transition-all hover:text-primary ${
                    isActive && "bg-muted text-primary"
                  }`;
                }}
              >
                <Lock className="h-4 w-4" />
                Update Password
              </NavLink>
            </nav>
            <div className="mt-auto">
              <Button className="w-full" onClick={removeAuthToken}>
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          Hello, <span className="font-medium">{authToken?.user?.name}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[180px] px-2 py-2"
          >
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                naivgate(`/dashboard/profile`);
              }}
            >
              <User className="mr-3 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                removeAuthToken();
              }}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
};

export default Topbar;
