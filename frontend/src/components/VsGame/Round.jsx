import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { calculateHpDamage } from "../../utils/scoreUtils";
import { calculatePlayerRoundScore } from "../../reducers/roundScoreReducer";
import { useDispatch, useSelector } from "react-redux";
import StreetView from "../Map/StreetView";
import RoundEndScreen from "./RoundEndScreen";

const Round = ({
  players,
  round,
  handleRoundChange,

  roomMapType,
  roomTitle,
  region,
  vsGameLocation,
  roomCode,
  //   vsRoundEnded,
}) => {
  const dispatch = useDispatch();
  const vsRoundEnded = useSelector((state) => state.vsGame.vsRoundEnded);
  //   console.log("vsRoundEnded in Round component", vsRoundEnded);

  if (!vsGameLocation) return <div>Loading...</div>;

  const endRound = () => {
    handleRoundChange(round + 1);

    socket.emit("end round", socket.id, roomCode);
  };

  const startRound = () => {
    socket.emit("start round", socket.id, roomCode);
  };

  // on top of this I guess I need a function to remove hp. Perhaps theres a need for another function that calculates score based on a round so that there is no oneshotting
  // Infinite distance bug - possible location !!!
  const calculatePlayerScore = async (distance, player = "p1") => {
    if (player === "p1") {
      const score = await dispatch(calculatePlayerRoundScore("p1", distance));
      console.log("dispatched p1 round score calculation, score is", score);
      socket.emit("score calculated", socket.id, roomCode, score);
    }

    if (player === "p2") {
      const score = await dispatch(calculatePlayerRoundScore("p2", distance));
      console.log("dispatched p2 round score calculation, score is", score);
      socket.emit("score calculated", socket.id, roomCode, score);
    }
  };

  return (
    <>
      <StreetView
        location={vsGameLocation}
        calculateScore={calculatePlayerScore}
        onRoundEnd={endRound}
        onRoundStart={startRound}
        isEnded={vsRoundEnded}
        roomCode={roomCode}
      />
    </>
  );
};

export default Round;
