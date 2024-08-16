import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import RoomLobby from "./RoomLobby";

const RoomControls = ({ room }) => {
  const [createOrJoinRoom, setCreateOrJoinRoom] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const joinRoom = (e) => {
    e.preventDefault();
    console.log("joining roooooom....");
    setCreateOrJoinRoom(true);
  };

  const createRoom = () => {
    console.log("creating a room");
    setCreateOrJoinRoom(true);
  };

  if (!createOrJoinRoom) {
    return (
      <div className="flex bg-indigo-400 w-[36rem] container mx-auto my-12 justify-between items-center divide-x-2 divide-dashed divide-indigo-200 rounded-lg shadow-md h-80">
        <div className="p-4 basis-1/2 flex justify-center text-center h-full">
          <Button onClick={createRoom} className="self-center">
            Create a room
          </Button>
        </div>
        <div className="p-4 basis-1/2 flex flex-col justify-center h-full">
          <form onSubmit={joinRoom}>
            <Input placeholder="Room code" />
            <Button className="w-full mt-2" type="submit">
              Join a room
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <RoomLobby
      room={room}
      gameStarted={gameStarted}
      handleGameStart={() => setGameStarted(true)}
    />
  );
};

export default RoomControls;
