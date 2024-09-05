import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { calculateHpDamage } from "../../utils/scoreUtils";
import { calculatePlayerRoundScore } from "../../reducers/roundScoreReducer";
import { causeHpRemoval } from "../../reducers/hpReducer";
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

  const removeHpFromPlayer = () => {
    const hpRemovalValue = calculateHpDamage(
      playerRoundScores[1].player2.score,
      playerRoundScores[0].player1.score
    );

    // there will be a difference between scores in 99.99% of cases, and even if there
    // isnt, the amount of hp being removed will be 0. So, no sense in trying to fix
    // for this edge case atm or maybe ever
    if (
      playerRoundScores[0].player1.score > playerRoundScores[1].player2.score
    ) {
      dispatch(causeHpRemoval("p2", hpRemovalValue));
    }

    if (
      playerRoundScores[0].player1.score < playerRoundScores[1].player2.score
    ) {
      dispatch(causeHpRemoval("p1", hpRemovalValue));
    }
  };

  const endRound = () => {
    handleRoundChange(round + 1);
    // this will be used to signal to the other player than a guess has been made
    socket.emit("end round", socket.id, roomCode);
    socket.emit("submit answer", socket.id, roomCode);
    removeHpFromPlayer();
  };

  const startRound = () => {
    socket.emit("start round", socket.id, roomCode);
  };

  // on top of this I guess I need a function to remove hp. Perhaps theres a need for another function that calculates score based on a round so that there is no oneshotting
  const calculatePlayerScore = async (distance, player = "p1") => {
    if (player === "p1") {
      const score = await dispatch(calculatePlayerRoundScore("p1", distance));
      console.log(
        "dispatched p1 round score calculation, score is",
        // playerRoundScores[0].player1.score
        score
      );
      socket.emit(
        "score calculated",
        socket.id,
        roomCode,
        // playerRoundScores[0].player1.score
        score
      );
    }

    if (player === "p2") {
      const score = await dispatch(calculatePlayerRoundScore("p2", distance));
      console.log(
        "dispatched p2 round score calculation, score is",
        // playerRoundScores[1].player2.score
        score
      );
      socket.emit(
        "score calculated",
        socket.id,
        roomCode,
        // playerRoundScores[1].player2.score
        score
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
