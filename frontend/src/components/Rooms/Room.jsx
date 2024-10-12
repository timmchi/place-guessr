import SingleGame from "../SingleGame/SingleGame";
import RoomLobby from "./RoomLobby";
import { socket } from "../../sockets/socket";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Room = ({
  room,
  vsGameLocation,
  //   roomCode
}) => {
  const navigate = useNavigate();
  const gameType = useSelector((state) => state.gameType);
  const roomCode = useSelector((state) => state.roomCode);

  if (!gameType) return <div>No game type chosen</div>;

  if (!room) return <div>This room does not exist</div>;

  // these 3 functions need to be changed, especially the backtohomepage and handlendgame - as end game event no longer controls the game state

  const handleEndGame = () => {
    navigate("/lobby");
    socket.emit("end game", roomCode);
  };

  return (
    <div className="text-2xl font-bold text-white">
      {gameType === "VS" ? (
        <RoomLobby
          room={room}
          roomCode={roomCode}
          handleGoingBack={handleEndGame}
          vsGameLocation={vsGameLocation}
        />
      ) : (
        <SingleGame room={room} />
      )}
    </div>
  );
};

export default Room;
