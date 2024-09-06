import SingleGame from "../SingleGame/SingleGame";
import RoomLobby from "./RoomLobby";
import { socket } from "../../sockets/socket";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Room = ({ room, vsGameLocation, roomCode }) => {
  const navigate = useNavigate();
  const gameType = useSelector((state) => state.gameType);

  if (!gameType) return <div>No game type chosen</div>;

  if (!room) return <div>This room does not exist</div>;

  const goBackToRoomList = () => {
    console.log("navigating back to room list...");
    navigate("/rooms");
  };

  const handleEndGame = () => {
    navigate("/lobby");
    socket.emit("end game", roomCode);
  };

  return (
    <div className="relative text-2xl font-bold text-white">
      <div className="absolute z-20 right-5 top-36">
        <Button
          onClick={goBackToRoomList}
          className="bg-green-600 opacity-50 hover:opacity-100 active:opacity-100"
        >
          Back to room selection
        </Button>
      </div>
      {gameType === "VS" ? (
        <RoomLobby
          room={room}
          roomCode={roomCode}
          handleGoingBack={handleEndGame}
          vsGameLocation={vsGameLocation}
        />
      ) : (
        <SingleGame
          roomMapType={room.region === "random" ? "world" : "country"}
          region={room.region !== "random" && room.region}
          roomTitle={room.title}
        />
      )}
    </div>
  );
};

export default Room;
