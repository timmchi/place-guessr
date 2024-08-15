import { Card, CardBody, Typography } from "@material-tailwind/react";

const RoomNameWithScore = ({ name, round, score }) => {
  return (
    <Card className="absolute z-20 top-8 right-0 w-128 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700  text-white shadow-lg">
      <CardBody className="flex gap-8 justify-center">
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
    </Card>
  );
};

export default RoomNameWithScore;
