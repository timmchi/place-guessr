import { Button } from "@material-tailwind/react";
import VsGame from "../VsGame/VsGame";

const RoomLobby = ({ room, gameStarted, handleGameStart }) => {
  if (!gameStarted) {
    return (
      <div>
        <div>
          <h2>Users</h2>
        </div>
        <div>
          <h3>Code</h3>
        </div>
        <Button onClick={handleGameStart}>Start the game</Button>
      </div>
    );
  }

  return (
    <VsGame
      roomMapType={room.region === "random" ? "world" : "country"}
      roomTitle={room.title}
    />
  );
};

export default RoomLobby;
