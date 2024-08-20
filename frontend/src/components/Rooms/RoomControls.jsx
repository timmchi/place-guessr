import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { generateRoomCode } from "../../utils/socketUtils";
import { useNavigate } from "react-router-dom";
import RoomLobby from "./RoomLobby";
import RoomsList from "./RoomsList";

const RoomControls = ({
  rooms,
  roomCode,
  setRoomCode,
  joiningUserRoomRegion,
  vsGameStarted,
  vsGameLocation,
}) => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomJoined, setRoomJoined] = useState(false);
  const navigate = useNavigate();

  //   const [roomCode, setRoomCode] = useState("");
  const roomRegion = rooms.find(
    (room) => room.region === joiningUserRoomRegion
  );
  console.log("room region", roomRegion);
  console.log("joining room region", joiningUserRoomRegion);

  const joinRoom = (e) => {
    e.preventDefault();
    console.log("joining roooooom....");
    socket.emit("join room", socket.id, roomCode);
    setRoomJoined(true);
  };

  const createRoom = () => {
    console.log("creating a room");
    // const generatedRoomCode = generateRoomCode();
    // setRoomCode(generatedRoomCode);
    socket.emit("create room", socket.id);
    setRoomCreated(true);
  };

  const handleEndGame = () => {
    navigate("/lobby");
    socket.emit("end game", roomCode);
  };

  if (roomCreated) {
    return (
      <>
        {/* <RoomLobby
        room={room}
        roomCode={roomCode}
        gameStarted={vsGameStarted}
        // handleGameStart={() => setGameStarted(true)}
        handleGoingBack={handleEndGame}
        vsGameLocation={vsGameLocation}
      /> */}
        <RoomsList type="VS" rooms={rooms} roomCode={roomCode} />
      </>
    );
  }

  if (roomJoined) {
    return (
      <RoomLobby
        room={roomRegion}
        roomCode={roomCode}
        gameStarted={vsGameStarted}
        handleGoingBack={handleEndGame}
        vsGameLocation={vsGameLocation}
      />
    );
  }

  return (
    <div className="flex bg-indigo-400 w-[36rem] container mx-auto my-12 justify-between items-center divide-x-2 divide-dashed divide-indigo-200 rounded-lg shadow-md h-80">
      <div className="p-4 basis-1/2 flex justify-center text-center h-full">
        <Button onClick={createRoom} className="self-center">
          Create a room
        </Button>
      </div>
      <div className="p-4 basis-1/2 flex flex-col justify-center h-full">
        <form onSubmit={joinRoom}>
          <Input
            placeholder="Room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <Button className="w-full mt-2" type="submit">
            Join a room
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RoomControls;
