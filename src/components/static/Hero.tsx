const Hero = () => {
  return (
    <div className="relative flex h-[78vh] w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <h1 className="font-cal text-5xl font-bold leading-tight md:text-6xl">
          Welcome to Saylani's
          <br />
          <span className="text-green-600 font-extrabold">
            Assignment Submission Portal
          </span>
        </h1>
        <p className="max-w-4xl text-lg text-muted-foreground md:text-xl">
          Simplify your assignment management with ease. Effortlessly submit,
          review, and manage assignments with our streamlined portal designed
          for students and teachers alike.
        </p>
        <a
          href="/dashboard"
          className="font-cal mt-6 inline-block transform rounded-xl bg-green-500 px-10 py-3 text-lg font-semibold text-white transition-transform hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Hero;
