import { Button } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../sockets/socket";

import CountryRoomPopover from "./CountryRoomPopover";

const RoomCard = ({ room, roomCode = null }) => {
  const navigate = useNavigate();

  const chooseRoom = () => {
    navigate(`/rooms/${room.region}`);
    if (roomCode) socket.emit("room chosen", roomCode, room.region);
  };

  return (
    <Card
      style={{ transition: "all 0.5s" }}
      className="relative grid h-[25rem] md:h-[30rem] md:w-full max-w-[20rem] items-end justify-center overflow-hidden text-center hover:scale-105"
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
      <CardBody className="relative py-4 px-6 md:py-14 md:px-12">
        <h1 className="mb-2 md:mb-6 font-medium leading-[1.5] text-2xl md:text-4xl text-white md:font-bold">
          {room.title}
        </h1>

        {room.region !== "random" && <CountryRoomPopover />}
        <div>
          <Avatar
            size="xl"
            variant="circular"
            alt={`flag of ${
              room.region !== "random" ? room.title : "the world"
            }`}
            className="border-2 border-indigo-700"
            src={room.flag}
          />
          <Button
            onClick={chooseRoom}
            className="bg-indigo-500 ml-2 hover:bg-indigo-700 py-2 px-4 md:py-3 md:px-6 lg:py-3.5 lg:px-7"
          >
            Select room
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default RoomCard;
