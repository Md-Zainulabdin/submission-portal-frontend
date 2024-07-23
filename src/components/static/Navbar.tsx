const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 py-6">
      <div className="logo">
        <h1 className="font-cal text-3xl md:text-4xl font-bold tracking-tight">
         Saylani / سیلانی
        </h1>
      </div>
      <div className="menu space-x-4">
        <a
          href="/auth/login"
          className="font-cal mt-6 inline-block transform rounded-xl bg-green-500 px-6 py-2 text-lg font-semibold text-white transition-transform hover:scale-105"
        >
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
