import { Spinner, Typography } from "@material-tailwind/react";

const UserMatchHistoryLoadingElement = () => {
  return (
    <div className="xl:w-[62rem] flex flex-col justify-center items-center py-24 gap-4">
      <Typography className="text-amber-300 font-bold text-xl md:text-3xl">
        Loading match history...
      </Typography>
      <Spinner
        color="indigo"
        className="h-8 w-8 md:h-12 md:w-12 text-amber-300"
      />
    </div>
  );
};

export default UserMatchHistoryLoadingElement;
