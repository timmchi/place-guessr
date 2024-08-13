import { useState } from "react";
import Player from "../Player/Player";
import { Button } from "@material-tailwind/react";
import { calculateScore } from "../../utils/scoreUtils";
import LocationFetcher from "../Map/LocationFetcher";
import StreetView from "../Map/StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

const SingleRound = ({
  player,
  round,
  handleRoundChange,
  roomMapType,
  region,
}) => {
  const [score, setScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);

  const { isLoading, data, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames",
    region && region
  );

  if (isLoading) return <div>Loading...</div>;

  const fetchLocation = () => {
    refetch();
  };

  const endRound = () => {
    setIsEnded(true);
    handleRoundChange(round + 1);
  };

  const startRound = () => {
    setIsEnded(false);
    refetch();
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
          <p>
            lat: {data?.lat}, lng: {data?.lng}
          </p>
          <div className="flex">
            <Button variant="outlined" onClick={fetchLocation}>
              Fetch location
            </Button>
          </div>
          {data && (
            <StreetView
              location={{ lat: data.lat, lng: data.lng }}
              calculateScore={calculateGameScore}
              onRoundEnd={endRound}
            />
          )}
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
