import { Spinner, Typography } from "@material-tailwind/react";

const LoadingScreen = () => {
  return (
    <div className="bg-indigo-300 h-screen text-white flex flex-col justify-center items-center gap-6">
      <Typography className="text-amber-300 font-bold text-3xl md:text-5xl">
        Loading, please wait...
      </Typography>
      <Spinner
        color="indigo"
        className="h-14 w-14 md:h-20 md:w-20 text-amber-300"
      />
    </div>
  );
};

export default LoadingScreen;
