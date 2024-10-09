import { Spinner, Typography } from "@material-tailwind/react";

const LoadingScreen = () => {
  return (
    <div className="bg-indigo-300 h-screen text-white flex flex-col justify-center items-center gap-6">
      <Typography variant="h1" className="text-amber-300">
        Loading, please wait...
      </Typography>
      <Spinner color="indigo" className="h-20 w-20 text-amber-300" />
    </div>
  );
};

export default LoadingScreen;
