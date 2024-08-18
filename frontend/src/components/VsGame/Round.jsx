import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import { calculateScore } from "../../utils/scoreUtils";
import StreetView from "../Map/StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";
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
}) => {
  const [isEnded, setIsEnded] = useState(false);
  const [player1HP, setPlayer1HP] = useState(5000);
  const [player2HP, setPlayer2HP] = useState(5000);
  const [player1RoundScore, setPlayer1RoundScore] = useState(0);
  const [player2RoundScore, setPlayer2RoundScore] = useState(0);

  if (!vsGameLocation) return <div>Loading...</div>;

  // players hp removed if he scores worse than the opponent, hence the word attacker - the opponent "attacks" the player who's hp is being removed, and the attacker is also declared the winner if the hp of the player being attacked reaches 0
  const removeHp = (hp, setHp, attacker) => {
    const newHp = Math.max(0, hp - 1000);
    setHp(newHp);

    if (newHp === 0) handleGameWin(attacker);
  };

  const resetHp = (setHp) => setHp(5000);

  const endRound = () => {
    setIsEnded(true);
    handleRoundChange(round + 1);
    // this will be used to signal to the other player than a guess has been made
    socket.emit("submit answer", socket.id, roomCode);
  };

  const startRound = () => {
    setIsEnded(false);
    // refetch();
    socket.emit(
      "fetch location",
      roomMapType === "world" ? "geolist" : "geonames",
      region,
      roomCode
    );
  };

  const resetGame = () => {
    setPlayer1HP(5000);
    setPlayer2HP(5000);
    setIsEnded(false);
    handleRoundChange(1);
    handleReset();
  };

  // on top of this I guess I need a function to remove hp. Perhaps theres a need for another function that calculates score based on a round so that there is no oneshotting
  const calculatePlayerScore = (distance, player = "player1") => {
    const calculatedScore = calculateScore(distance);
    player === "player1"
      ? setPlayer1RoundScore(calculatedScore)
      : setPlayer2RoundScore(calculatedScore);
  };

  return (
    <div>
      {/* <Button onClick={resetGame}>Reset game</Button> */}
      {winner && (
        <div className="absolute z-20 top-1/2 left-1/2 text-4xl font-bold text-red-500">
          {winner.name} wins! Fatality
        </div>
      )}
      {/* {!isEnded && !winner && (
        <>
          <h1 className="text-4xl font-bold">Round {round}</h1>
          <Button onClick={endRound}>End round</Button>
          <LocationFetcher />
        </>
      )} */}
      {/* {isEnded && !winner && <Button onClick={startRound}>Next round</Button>} */}
      {/* {data && ( */}
      <>
        <StreetView
          location={vsGameLocation}
          calculateScore={calculatePlayerScore}
          onRoundEnd={endRound}
          onRoundStart={startRound}
          isEnded={isEnded}
        />
      </>
      {/* )} */}
      {isEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round - 1} results</h1>
          <RoundEndScreen
            players={players}
            player1hp={player1HP}
            player2hp={player2HP}
            removePlayer1hp={() =>
              removeHp(player1HP, setPlayer1HP, players[1])
            }
            removePlayer2hp={() =>
              removeHp(player2HP, setPlayer2HP, players[0])
            }
            resetPlayer1hp={() => resetHp(setPlayer1HP)}
            resetPlayer2hp={() => resetHp(setPlayer2HP)}
          />
        </>
      )}
    </div>
  );
};

export default Round;
