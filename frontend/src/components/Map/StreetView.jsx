import { useEffect, useState, useRef } from "react";
import useStreetView from "../../hooks/useStreetView";
import {
  GoogleMap,
  StreetViewPanorama,
  //   useJsApiLoader,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { haversine_distance } from "../../utils/scoreUtils";
import MapElement from "./Map";
import { Button } from "@material-tailwind/react";
import { socket } from "../../sockets/socket";

// const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAX_RADIUS = 17000;

const StreetView = ({
  location,
  calculateScore,
  onRoundEnd,
  onRoundStart,
  isEnded,
  roomCode,
}) => {
  const streetViewService = useStreetView();
  const [panoPosition, setPanoPosition] = useState(null);
  const [guessLocation, setGuessLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);
  const player = useSelector((state) => state.player);
  const gameType = useSelector((state) => state.gameType);
  const roundEnded = useSelector((state) => state.vsGame.vsRoundEnded);
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);

  let distance;

  if (answerLocation && guessLocation)
    distance = Math.trunc(haversine_distance(guessLocation, answerLocation));

  const mapRef = useRef(null);
  const streetViewRef = useRef(null);

  //   const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY });

  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

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
          }
        }
      });
    };

    getStreetView(5000);
  }, [location, streetViewService, roomCode]);

  // unmount cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current = null;

      if (streetViewRef.current) streetViewRef.current = null;
    };
  }, []);

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

    socket.emit("guess sent", socket.id, roomCode, guessLocation);
    socket.emit("submit answer", socket.id, roomCode, guessLocation);

    setAnswerLocation(updatedAnswerLocation);

    onRoundEnd();
  };

  // Different handle start round function for vs mode and single mode?
  // Do i need to set these to null in the vs game?
  const handleStartRound = () => {
    onRoundStart();

    if (gameType !== "VS") {
      setGuessLocation(null);
      setAnswerLocation(null);
    }
  };

  return (
    <div className="">
      <div className="relative">
        {/* here are the controls for the single game, in the case of the single game here is also where the score is rendered */}
        {distance && gameType !== "VS" && (
          <div className="absolute z-20 text-white-200 bottom-0 left-[42rem] pb-8 font-bold flex items-center gap-4 text-white">
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
          </div>
        )}
        {roundEnded && !gameWinner && (
          <div className="absolute z-20 text-white-200 bottom-0 xl:left-[54rem] pb-16 font-bold flex items-center text-white">
            <Button
              className="bg-green-700 hover:bg-green-900 rounded-full text-lg"
              onClick={handleStartRound}
            >
              Start Next Round
            </Button>
          </div>
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={panoPosition}
          zoom={10}
          onLoad={(map) => (mapRef.current = map)}
          onUnmount={() => (mapRef.current = null)}
        >
          <StreetViewPanorama
            mapContainerStyle={containerStyle}
            position={panoPosition}
            visible={true}
            options={{
              pov: {
                heading: 34,
                pitch: 10,
              },
              showRoadLabels: false,
              addressControl: false,
              enableCloseButton: false,
              zoomControl: false,
              fullscreenControl: false,
            }}
            onLoad={(streetView) => (streetViewRef.current = streetView)}
            onUnmount={() => (streetViewRef.current = null)}
          />
        </GoogleMap>
        <MapElement
          placeGuessMarker={placeGuessMarker}
          guessLocation={guessLocation}
          answerLocation={answerLocation}
          submitGuess={gameType === "VS" ? submitVsGuess : submitSingleGuess}
          isEnded={isEnded}
        />
      </div>
    </div>
  );
};

export default StreetView;
