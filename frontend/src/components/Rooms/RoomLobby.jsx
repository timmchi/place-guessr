import { useState } from "react";
import { Button, Typography, Avatar } from "@material-tailwind/react";
import VsGame from "../VsGame/VsGame";
import PlayerInLobby from "../Player/PlayerInLobby";
import { useSelector } from "react-redux";
import avatar from "../../../test/vavatar.jpg";
import { socket } from "../../sockets/socket";

const players = [
  { id: 1, name: "Kariz", avatar: avatar },
  { id: 2, name: "Sheldon", avatar: avatar },
];

const RoomLobby = ({ room, vsGameLocation, handleGoingBack, roomCode }) => {
  const gameStarted = useSelector((state) => state.vsGame.vsGameStarted);

  const handleGameStart = () => {
    socket.emit("start game", roomCode);
    socket.emit(
      "fetch location",
      room.region === "random" ? "geolist" : "geonames",
      room.region,
      roomCode
    );
  };

  // add styling here
  if (!room) return <div>loading room...</div>;

  if (!gameStarted) {
    return (
      <div className="flex bg-indigo-200 min-h-screen justify-center items-center">
        <div className="self-start w-[50%] bg-indigo-400 mx-auto rounded-lg shadow-md my-auto text-white">
          <div className="flex gap-4 justify-center pt-12">
            <Typography variant="h1" className="text-center pt-2">
              {room.title}
            </Typography>
            <Avatar
              size="xl"
              variant="circular"
              alt={`flag of ${
                room.region !== "random" ? room.title : "the world"
              }`}
              className="border-2 border-indigo-700"
              src={room.flag}
            />
          </div>
          <div className="py-20 text-center">
            <Typography variant="h1" className="text-yellow-600 pb-8">
              {roomCode}
            </Typography>
            <Typography variant="h5">
              Send this code to the person you want to play with
            </Typography>
          </div>
          <div className="flex flex-col justify-center text-center">
            <Typography variant="h3">Joined users</Typography>
            <ul className="flex gap-4 justify-center mt-8">
              {players.map((player) => (
                <li key={player.id}>
                  {/* maybe make this clickable so that it opens users profile? is there a point?.. */}
                  <PlayerInLobby player={player} />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 justify-center py-8">
            <Button
              onClick={handleGameStart}
              className="bg-green-700 hover:bg-green-800"
            >
              Start the game
            </Button>
            <Button
              onClick={handleGoingBack}
              className="bg-deep-purple-300 hover:bg-deep-purple-400"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <VsGame
      roomMapType={room.region === "random" ? "world" : "country"}
      roomTitle={room.title}
      region={room.region}
      vsGameLocation={vsGameLocation}
      roomCode={roomCode}
    />
  );
};

export default RoomLobby;
