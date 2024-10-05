import { useState } from "react";
import { calculateScore } from "../../utils/scoreUtils";
import StreetView from "../Map/StreetView";
import RoomNameWithScore from "../RoomNameWithScore";
import useRandomLocation from "../../hooks/useRandomLocation";
import { useNavigate } from "react-router-dom";
import GeonamesErrorScreen from "../GeonamesErrorScreen";

const SingleRound = ({
  round,
  handleRoundChange,
  roomMapType,
  region,
  roomTitle,
}) => {
  const [totalScore, setTotalScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const navigate = useNavigate();

  const { isLoading, data, error, isError, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames",
    region && region
  );

  if (isLoading) return <div>Loading...</div>;

  // the geonames API which is responsible for fetching locations for country rooms
  // tends to not work properly during the EEST day time hours. In the case there is an error,
  // I want the user to go and play the whole world map
  if (isError) return <GeonamesErrorScreen error={error} refetch={refetch} />;

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
    const newTotalScore = totalScore + calculatedScore;
    setRoundScore(calculatedScore);
    setTotalScore(newTotalScore);
  };

  return (
    <div>
      <>
        {data && (
          <>
            <StreetView
              location={{ lat: data.lat, lng: data.lng }}
              calculateScore={calculateGameScore}
              onRoundEnd={endRound}
              onRoundStart={startRound}
              isEnded={isEnded}
              score={roundScore}
              round={round - 1}
            />
            {!isEnded && (
              <RoomNameWithScore
                name={roomTitle}
                round={round}
                score={totalScore}
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SingleRound;
