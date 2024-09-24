import Player from "../Player/Player";
import { useSelector, useDispatch } from "react-redux";
import { gameWon } from "../../reducers/vsGameReducer";
import { useEffect } from "react";
import { socket } from "../../sockets/socket";

// I DONT USE THIS COMPONENT ANYMORE

const RoundEndScreen = ({ players }) => {
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerRoundScores = useSelector((state) => state.roundScore);
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);
  const dispatch = useDispatch();

  console.log(
    "round end screen hps p1 p2",
    playerHealthPoints[0].player1.hp,
    playerHealthPoints[1].player2.hp
  );

  return (
    <div className="flex xl:gap-[66rem]">
      {/* {gameWinner && (
        <div className="absolute z-20 top-1/2 left-1/2 text-4xl font-bold text-red-500">
          {gameWinner} wins! Fatality
        </div>
      )} */}
      <Player
        key="player1"
        player={players[0]}
        healthPoints={playerHealthPoints[0].player1.hp}
        score={playerRoundScores[0].player1.score}
        gameType="vs"
      />
      <Player
        key="player2"
        player={players[1]}
        healthPoints={playerHealthPoints[1].player2.hp}
        score={playerRoundScores[1].player2.score}
        gameType="vs"
      />
    </div>
  );
};

export default RoundEndScreen;
