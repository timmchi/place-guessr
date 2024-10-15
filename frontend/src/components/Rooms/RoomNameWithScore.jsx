import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const RoomNameWithScore = ({ name, round, score, handleGameEnd }) => {
  return (
    <Card className="absolute z-20 top-8 right-0 w-128 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg divide-y divide-indigo-300 opacity-95">
      <CardBody className="flex gap-2 md:gap-8 justify-center pt-2 md:pt-base pb-1 md:pb-4">
        <div className="flex-col">
          <Typography variant="h6" className="opacity-60">
            Room
          </Typography>
          <Typography variant="h5">{name}</Typography>
        </div>
        <div className="flex-col">
          <Typography variant="h6" className="opacity-60">
            Round
          </Typography>
          <Typography variant="h5">{round}</Typography>
        </div>
        <div className="flex-col">
          <Typography variant="h6" className="opacity-60">
            Score
          </Typography>
          <Typography variant="h5">{Math.trunc(score)}</Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-2 pb-2 flex justify-center items-center">
        <Button
          className="w-full bg-green-500 hover:bg-green-700"
          onClick={handleGameEnd}
        >
          End the game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomNameWithScore;
