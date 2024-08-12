import { useState } from "react";
import Player from "../Player/Player";
import { Button } from "@material-tailwind/react";
import { calculateScore } from "../../utils/scoreUtils";
import LocationFetcher from "../Map/LocationFetcher";

const SingleRound = ({ player, round, handleRoundChange, roomMapType }) => {
  const [score, setScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const [fetchNewLocation, setFetchNewLocation] = useState(null);

  const endRound = () => {
    setIsEnded(true);
    handleRoundChange(round + 1);
  };

  const startRound = () => {
    setIsEnded(false);
    if (fetchNewLocation) fetchNewLocation();
  };

  const resetGame = () => {
    setIsEnded(false);
    handleRoundChange(1);
  };

  const calculateGameScore = (distance) => {
    const calculatedScore = calculateScore(distance);
    const newScore = score + calculatedScore;
    setScore(newScore);
  };

  return (
    <div>
      <Button onClick={resetGame}>Reset game</Button>
      {!isEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round}</h1>
          <LocationFetcher
            calculateScore={calculateGameScore}
            roomMapType={roomMapType}
            onRoundEnd={endRound}
            setRefetch={setFetchNewLocation}
            // isEnded={isEnded}
          />
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
