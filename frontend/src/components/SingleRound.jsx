import { useState } from "react";
import Player from "./Player";
import { Button } from "@material-tailwind/react";

const SingleRound = ({ player, round, handleRoundChange }) => {
  const [score, setScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  const endRound = () => {
    setIsEnded(true);
    handleRoundChange(round + 1);
  };

  const startRound = () => {
    setIsEnded(false);
  };

  const resetGame = () => {
    setIsEnded(false);
    handleRoundChange(1);
  };

  return (
    <div>
      <Button onClick={resetGame}>Reset game</Button>
      {!isEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round}</h1>
          <Button onClick={endRound}>End round</Button>
        </>
      )}
      {isEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round - 1} results</h1>
          <Player player={player} gameType="single" score={score} />
          <Button onClick={startRound}>Next round</Button>
        </>
      )}
    </div>
  );
};

export default SingleRound;
