import LogInForm from "./LogInForm";

const LogIn = () => {
  return (
    <div className="flex h-screen">
      <div className="flex md:basis-1/2 justify-center bg-indigo-300 text-white items-center">
        <LogInForm />
      </div>
      <div className="flex md:basis-1/2 bg-cover bg-center"></div>
    </div>
  );
};

export default LogIn;
