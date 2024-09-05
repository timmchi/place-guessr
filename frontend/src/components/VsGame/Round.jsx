import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { calculateScore } from "../../utils/scoreUtils";
import { calculatePlayerRoundScore } from "../../reducers/roundScoreReducer";
import { useDispatch, useSelector } from "react-redux";
import StreetView from "../Map/StreetView";
import RoundEndScreen from "./RoundEndScreen";

const Round = ({
  players,
  round,
  handleRoundChange,
  winner,
  handleGameWin,
  handleReset,
  roomMapType,
  roomTitle,
  region,
  vsGameLocation,
  roomCode,
  vsRoundEnded,
}) => {
  const dispatch = useDispatch();
  const playerRoundScores = useSelector((state) => state.roundScore);

  if (!vsGameLocation) return <div>Loading...</div>;

  const endRound = () => {
    handleRoundChange(round + 1);
    // this will be used to signal to the other player than a guess has been made
    socket.emit("end round", socket.id, roomCode);
    socket.emit("submit answer", socket.id, roomCode);
  };

  const startRound = () => {
    socket.emit("start round", socket.id, roomCode);
  };

  // on top of this I guess I need a function to remove hp. Perhaps theres a need for another function that calculates score based on a round so that there is no oneshotting
  const calculatePlayerScore = (distance, player = "p1") => {
    // player === "p1"
    //   ? dispatch(calculatePlayerRoundScore("p1", distance))
    //   : dispatch(calculatePlayerRoundScore("p2", distance));

    if (player === "p1") {
      dispatch(calculatePlayerRoundScore("p1", distance));
      socket.emit(
        "score calculated",
        socket.id,
        roomCode,
        playerRoundScores[0].player1.score
      );
    }

    if (player === "p2") {
      dispatch(calculatePlayerRoundScore("p2", distance));
      socket.emit(
        "score calculated",
        socket.id,
        roomCode,
        playerRoundScores[1].player2.score
      );
    }
  };

  return (
    <div>
      {winner && (
        <div className="absolute z-20 top-1/2 left-1/2 text-4xl font-bold text-red-500">
          {winner.name} wins! Fatality
        </div>
      )}
      <>
        <StreetView
          location={vsGameLocation}
          calculateScore={calculatePlayerScore}
          onRoundEnd={endRound}
          onRoundStart={startRound}
          isEnded={vsRoundEnded}
        />
      </>
      {vsRoundEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round - 1} results</h1>
          <RoundEndScreen
            players={players}
            // player1hp={player1HP}
            // player2hp={player2HP}
            // removePlayer1hp={() =>
            //   removeHp(player1HP, setPlayer1HP, players[1])
            // }
            // removePlayer2hp={() =>
            //   removeHp(player2HP, setPlayer2HP, players[0])
            // }
            // resetPlayer1hp={() => resetHp(setPlayer1HP)}
            // resetPlayer2hp={() => resetHp(setPlayer2HP)}
          />
        </>
      )}
    </div>
  );
};

export default Round;
