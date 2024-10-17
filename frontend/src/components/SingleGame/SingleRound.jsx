import { useState } from "react";
import { calculateScore } from "../../utils/scoreUtils";
import StreetViewController from "../Map/StreetViewController";
import RoomNameWithScore from "../Rooms/RoomNameWithScore";
import useRandomLocation from "../../hooks/useRandomLocation";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GeonamesErrorScreen from "../Screens/GeonamesErrorScreen";
import SingleGameEndScreen from "./SingleGameEndScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import useNotification from "../../hooks/useNotification";
import { useMutation } from "@tanstack/react-query";
import gamesService from "../../services/games";

const SingleRound = ({
  round,
  handleRoundChange,
  roomMapType,
  room,
  gameEnded,
  setGameEnded,
}) => {
  const [totalScore, setTotalScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  const { displayNotification } = useNotification();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { isLoading, data, error, isError, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames",
    room.region && room.region
  );

  // maybe this will go in the separate useGames hook
  const saveSingleGameMutation = useMutation({
    mutationFn: gamesService.saveSingleGame,
    onSuccess: (data) => {
      console.log("successfully saved the game", data);
      displayNotification("success", "Game saved successfully");
    },
    onError: (error) => {
      displayNotification(
        "error",
        "Something went wrong when saving the game",
        error.message
      );
    },
  });

  if (isLoading) return <LoadingScreen />;

  // the geonames API which is responsible for fetching locations for country rooms
  // tends to not work properly during the EEST day time hours. In the case there is an error,
  // I want the user to go and play the whole world map
  if (isError) return <GeonamesErrorScreen error={error} refetch={refetch} />;

  const endRound = () => {
    setIsEnded(true);
    handleRoundChange(round + 1);
  };

  const startRound = () => {
    setIsEnded(false);
    refetch();
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

  // we save the single game here
  const handleSingleGameExit = () => {
    setGameEnded(false);
    navigate("/");

    // here we need game data and userdata, it will also need to invalidate the user profile query so that the users list of games is updated
    if (user)
      saveSingleGameMutation.mutate({
        gameType: "SINGLE",
        map: room.region,
        score: totalScore,
        user,
      });

    displayNotification("success", "Game ended successfully");
  };

  if (gameEnded)
    return (
      <SingleGameEndScreen
        room={room}
        totalScore={totalScore}
        handleGameExit={handleSingleGameExit}
        round={round - 1}
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
                handleGameEnd={() => setGameEnded(true)}
              />
            )}
          </>
        )}
      </>
    </div>
  );
};

export default SingleRound;
