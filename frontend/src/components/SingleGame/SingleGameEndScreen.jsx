import { Button, Avatar, Typography } from "@material-tailwind/react";

const SingleGameEndScreen = ({ room, totalScore, handleGameEnd }) => {
  return (
    <div className="h-screen bg-indigo-300 flex flex-col justify-center items-center">
      <Avatar
        size="xl"
        variant="circular"
        alt={`flag of ${room.region !== "random" ? room.title : "the world"}`}
        className="border-2 border-indigo-700"
        src={room.flag}
      />
      <Typography variant="h1">
        {room.region !== "random" ? room.title : "the world"}
      </Typography>
      <div className="text-center pt-8">
        <Typography variant="h2">Game is complete</Typography>
        <Typography variant="h3">
          You got {Math.floor(totalScore)} out of 25000 points
        </Typography>
        <Button
          onClick={handleGameEnd}
          className="mt-4 w-full p-4 text-lg font-bold bg-amber-200 hover:bg-amber-400 text-indigo-500"
        >
          Back to main page
        </Button>
      </div>
    </div>
  );
};

export default SingleGameEndScreen;