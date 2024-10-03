import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { calculateHpDamage } from "../../utils/scoreUtils";
import { calculatePlayerRoundScore } from "../../reducers/roundScoreReducer";
import { useDispatch, useSelector } from "react-redux";
import StreetView from "../Map/StreetView";
import PlayerOverlay from "../Player/PlayerOverlay";
import avatar from "../../../test/vavatar.jpg";
import avatar2 from "../../../test/avatar2.jpg";

const Round = ({
  round,
  handleRoundChange,
  roomMapType,
  roomTitle,
  region,
  vsGameLocation,
  //   roomCode,
}) => {
  const vsRoundEnded = useSelector((state) => state.vsGame.vsRoundEnded);
  const playerHealthPoints = useSelector((state) => state.hp);
  const roomCode = useSelector((state) => state.roomCode);
  const playersInRoom = useSelector((state) => state.roomPlayers);

  // i suppose it would make sense to emit hps here and do the use effect to check for the winner
  // I'm not sure about the way to do this without the effect
  useEffect(() => {
    socket.emit(
      "winner check",
      roomCode,
      playerHealthPoints.player1HP,
      playerHealthPoints.player2HP
    );
  }, [playerHealthPoints, roomCode]);

  if (!vsGameLocation) return <div>Loading...</div>;

  const endRound = () => {
    handleRoundChange(round + 1);

    socket.emit("end round", socket.id, roomCode);
  };

  const startRound = () => {
    socket.emit("start round", socket.id, roomCode);
  };

  return (
    <div className="relative">
      <StreetView
        location={vsGameLocation}
        onRoundEnd={endRound}
        onRoundStart={startRound}
        isEnded={vsRoundEnded}
        roomCode={roomCode}
      />
      {!vsRoundEnded && (
        <div className="absolute top-0 left-0 right-0 z-10">
          <PlayerOverlay
            player1={playersInRoom.player1.player1Object}
            player2={playersInRoom.player2.player2Object}
          />
        </div>
      )}
    </div>
  );
};

export default Round;
