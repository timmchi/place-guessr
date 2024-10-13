import { useEffect, useState } from "react";
import useStreetView from "../../hooks/useStreetView";
import { useSelector, useDispatch } from "react-redux";
import { haversine_distance } from "../../utils/scoreUtils";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";
import PanoramaErrorScreen from "../Screens/PanoramaErrorScreen";
import {
  errorHappened,
  newLocationFetched,
} from "../../reducers/panoramaErrorReducer";
import StreetView from "./StreetView";

const MAX_RADIUS = 10000;

const StreetViewController = ({
  location,
  calculateScore,
  onRoundEnd,
  onRoundStart,
  isEnded,
  roomCode,
  score,
  refetch,
  roomRegion,
}) => {
  const streetViewService = useStreetView();
  const dispatch = useDispatch();
  const [panoPosition, setPanoPosition] = useState(null);
  const [guessLocation, setGuessLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);
  const [guessSubmitted, setGuessSubmitted] = useState(false);
  const player = useSelector((state) => state.player);
  const gameType = useSelector((state) => state.gameType);
  const roundEnded = useSelector((state) => state.vsGame.vsRoundEnded);
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);
  const panoramaError = useSelector((state) => state.panoramaError);
  const playerId = useSelector((state) => state.playerId);

  let distance;

  if (answerLocation && guessLocation)
    distance = Math.trunc(haversine_distance(guessLocation, answerLocation));

  useEffect(() => {
    if (!location || !streetViewService) return;

    const getStreetView = (radius) => {
      const streetViewRequest = {
        location: location,
        radius: radius,
      };

      streetViewService.getPanorama(streetViewRequest, (data, status) => {
        if (status === "OK" && data && data.location && data.location.latLng) {
          const panoLoc = data.location.latLng.toJSON();

          // console.log("panoLoc", panoLoc);
          setPanoPosition(panoLoc);
          if (roomCode) socket.emit("panorama set", panoLoc);
          // console.log("panoPosition", panoPosition);
        } else {
          if (radius < MAX_RADIUS) {
            console.log(
              `No street view found for radius ${radius}. Trying again with radius ${
                radius + 1000
              }`
            );
            getStreetView(radius + 1000);
          } else {
            console.log("No street view found within maximum radius");
            // setPanoramaError(true);
            dispatch(errorHappened());

            // so, we probably want to render a component which will notify the user of there being a mistake, and give them an option to fetch a new random location
            // for single mode, the button to fetch a location will use a refetch, and for vs mode,
            // both players will need to press the button to send out an event
            // so, set a condition, render error screen based on the location and game type

            // it could be argued that this error could be hidden from the user and new location should fetch automatically if such an error occurs. Not sure which approach is best
          }
        }
      });
    };

    getStreetView(5000);
  }, [location, streetViewService, roomCode, dispatch]);

  // vs game effect that listens for round start to reset the guess and answer
  // it will reset these once both of the users decided to start round and should avoid the error
  // maybe i could emit another event from the backend
  useEffect(() => {
    const onRoundStarted = () => {
      setGuessLocation(null);
      setAnswerLocation(null);
    };

    socket.on("start round", onRoundStarted);

    return () => {
      socket.off("start round", onRoundStarted);
    };
  }, []);

  //   if (!isLoaded) return null;

  //   console.log("panoPosition outside", panoPosition);

  const placeGuessMarker = (e) => {
    console.log(e.detail);

    const { latLng } = e.detail;
    setGuessLocation(latLng);
    console.log(latLng);
  };

  const submitSingleGuess = () => {
    console.log("submitting guess in single game");
    const updatedAnswerLocation = panoPosition;

    setAnswerLocation(updatedAnswerLocation);

    const distanceResult = Math.trunc(
      haversine_distance(guessLocation, updatedAnswerLocation)
    );

    calculateScore(distanceResult, player.player);

    onRoundEnd();
  };

  const submitVsGuess = () => {
    console.log("submitting guess in vs game");

    const updatedAnswerLocation = panoPosition;

    // this is for syncing the locations of guesses by players

    socket.emit("guess sent", playerId, roomCode, guessLocation, (ack) => {
      if (ack) {
        console.log("Guess successfully sent and acknowledge by server");
      } else {
        console.log("Failed to send guess to server, retrying...");
        submitVsGuess();
      }

      setGuessSubmitted(true);
    });

    // this is for syncing scores of players and distances between answer and their guess

    socket.emit("submit answer", playerId, roomCode, guessLocation, (ack) => {
      if (ack) {
        ("Answer successfully submitted and acknowledged by server");
        setAnswerLocation(updatedAnswerLocation);

        onRoundEnd();
      } else {
        console.log("Failed to submit answer to server, retrying...");
        submitVsGuess();
      }
    });
  };

  // Different handle start round function for vs mode and single mode?
  // Do i need to set these to null in the vs game?
  const handleStartRound = () => {
    onRoundStart();
    setGuessSubmitted(false);
    if (gameType !== "VS") {
      setGuessLocation(null);
      setAnswerLocation(null);
    }
  };

  // i neeed to somehow get both refetch and some new events here
  // SO, we need a refetch here, and also event emit (just one player doing it is fine)
  // whatever is called will depend on the game type
  const handleNewLocationFetch = () => {
    console.log("new location should be fetched here based on game type");

    if (gameType === "SINGLE") {
      // single game location is fetched using react query, the refetch comes from there
      dispatch(newLocationFetched());
      refetch();
      // for some reason, 2 locations are refetched...
    }

    if (gameType === "VS") {
      socket.emit(
        "fetch location",
        roomRegion === "random" ? "geolist" : "geonames",
        roomRegion,
        roomCode
      );
    }
  };

  if (panoramaError)
    return (
      <PanoramaErrorScreen handleNewLocationFetch={handleNewLocationFetch} />
    );

  return (
    <div className="">
      <div className="relative">
        {/* here are the controls for the single game, in the case of the single game here is also where the score is rendered */}
        {distance && gameType !== "VS" && (
          <div className="absolute z-20 text-white-200 bottom-0 left-1/2 transform -translate-x-1/2 pb-8 font-bold flex items-center gap-4 text-white">
            <div>
              <p className="text-4xl">{distance} km</p>
              <p className="text-sm">from location</p>
            </div>

            <Button
              className="bg-green-700 hover:bg-green-900 rounded-full text-lg"
              onClick={handleStartRound}
            >
              Start Next Round
            </Button>
            <div className="text-xl font-bold">
              <p className="text-yellow-700 text-4xl">{Math.trunc(score)}</p>
              <p className="text-sm">out of 5000 points</p>
            </div>
          </div>
        )}
        {roundEnded && !gameWinner && (
          <div className="absolute z-20 text-white-200 bottom-0 left-1/2 transform -translate-x-1/2 pb-16 font-bold flex items-center text-white">
            <Button
              className="bg-green-700 hover:bg-green-900 rounded-full text-lg"
              onClick={handleStartRound}
            >
              Start Next Round
            </Button>
          </div>
        )}
        <StreetView
          panoPosition={panoPosition}
          isEnded={isEnded}
          placeGuessMarker={placeGuessMarker}
          guessLocation={guessLocation}
          answerLocation={answerLocation}
          submitGuess={gameType === "VS" ? submitVsGuess : submitSingleGuess}
          guessSubmitted={guessSubmitted}
        />
      </div>
    </div>
  );
};

export default StreetViewController;
