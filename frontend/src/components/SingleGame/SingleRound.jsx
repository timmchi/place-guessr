import { useState } from "react";
import { calculateScore } from "../../utils/scoreUtils";
import StreetViewController from "../Map/StreetViewController";
import RoomNameWithScore from "../Rooms/RoomNameWithScore";
import useRandomLocation from "../../hooks/useRandomLocation";
import { useNavigate } from "react-router-dom";
import GeonamesErrorScreen from "../Screens/GeonamesErrorScreen";
import SingleGameEndScreen from "./SingleGameEndScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import useNotification from "../../hooks/useNotification";

const SingleRound = ({ round, handleRoundChange, roomMapType, room }) => {
  const [totalScore, setTotalScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const { displayNotification } = useNotification();
  const navigate = useNavigate();

  const { isLoading, data, error, isError, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames",
    room.region && room.region
  );

  if (isLoading) return <LoadingScreen />;

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

  // we need to plug in the map size here
  const calculateGameScore = (distance) => {
    // console.log("map size for game score", room.mapSize);
    const calculatedScore = calculateScore(distance, room.mapSize);
    // console.log("score calculated based on mapSize", calculatedScore);
    const newTotalScore = totalScore + calculatedScore;
    setRoundScore(calculatedScore);
    setTotalScore(newTotalScore);
  };

  // so, to limit the amount of rounds to 5 in a country based map, we first check the room map type,
  // then if the type is not random, we proceed
  // when the round reaches more than 5, which will happen once we start the round after seeing the result, (also could be done automatically/change button text dynamically based on round #), render a end game screen with the score out of maximum score, player avatar and player name, button to go to room selection/main page and reset some relevant state

  const handleSingleGameEnd = () => {
    navigate("/");
    // will be used later to record game in user profile
    displayNotification("success", "Game ended successfully");
  };

  if (roomMapType !== "world" && round > 5)
    return (
      <SingleGameEndScreen
        room={room}
        totalScore={totalScore}
        handleGameEnd={handleSingleGameEnd}
      />
    );

  return (
    <div>
      <>
        {data && (
          <>
            <StreetViewController
              location={{ lat: data.lat, lng: data.lng }}
              calculateScore={calculateGameScore}
              onRoundEnd={endRound}
              onRoundStart={startRound}
              isEnded={isEnded}
              score={roundScore}
              round={round - 1}
              // refetch is passed here because it will need to be called in case of a panorama not being found for a location
              refetch={refetch}
            />
            {!isEnded && (
              <RoomNameWithScore
                name={room.title}
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
