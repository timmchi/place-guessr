import { Button } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <Card
      shadow={false}
      className="relative grid h-[30rem] w-full max-w-[20rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        style={{ backgroundImage: `url(${room.bgImage})` }}
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          {room.title}
        </Typography>
        <Avatar
          size="xl"
          variant="circular"
          alt={`flag of ${room.region !== "random" ? room.title : "the world"}`}
          className="border-2 border-white"
          src={room.flag}
        />
        <Button
          onClick={() => navigate(`/rooms/${room.region}`)}
          className="bg-indigo-500 ml-2 hover:bg-indigo-700"
        >
          Select room
        </Button>
      </CardBody>
    </Card>
  );
};

export default RoomCard;
