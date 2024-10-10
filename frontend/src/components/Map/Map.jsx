import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Button, Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useState } from "react";
import EndRoundMap from "./EndRoundMap";
import WinnerScreen from "../Player/WinnerScreen";
import VsGameEndRoundScreen from "../VsGame/VsGameEndRoundScreen";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const MapElement = ({
  placeGuessMarker,
  guessLocation,
  answerLocation,
  submitGuess,
  isEnded,
  guessSubmitted,
}) => {
  const gameType = useSelector((state) => state.gameType);
  const { player1Guess, player2Guess } = useSelector(
    (state) => state.roundGuesses
  );
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);
  const playersInRoom = useSelector((state) => state.roomPlayers);
  const [mapOpen, setMapOpen] = useState(false);

  // here is where the end round map is situated, needs to be fixed for a vs game - smaller map
  // and player profiles on the sides
  if (isEnded && gameType === "SINGLE") {
    return (
      <div
        style={{ transition: "all 0.5s" }}
        className="h-[100%] w-[100%] absolute z-10 top-0 bg-indigo-300 pb-36"
      >
        <EndRoundMap
          gameType={gameType}
          guessLocation={guessLocation}
          answerLocation={answerLocation}
          player1Guess={player1Guess}
          player2Guess={player2Guess}
        />
      </div>
    );
  }

  // i dont use the round end screen anymore, this is what gets rendered
  if (isEnded && gameType === "VS" && !gameWinner)
    return (
      <VsGameEndRoundScreen
        guessLocation={guessLocation}
        answerLocation={answerLocation}
      />
    );

  if (gameWinner) {
    return (
      <WinnerScreen
        player={
          gameWinner === "p1"
            ? playersInRoom.player1.player1Object
            : playersInRoom.player2.player2Object
        }
      />
    );
  }

  return (
    <div className="absolute z-10 bottom-32 left-0.5 md:left-8">
      <Button
        onClick={() => setMapOpen(!mapOpen)}
        className="bg-indigo-400 hover:bg-indigo-500 mb-2"
      >
        {!mapOpen ? "Open map" : "Close map"}
      </Button>
      <div
        style={{ transition: "all 0.5s", display: mapOpen ? "" : "none" }}
        className="h-72 w-96 opacity-50 hover:h-[27rem] hover:w-[24rem] md:hover:w-[36rem] active:h-[27rem] active:w-[24rem] md:active:w-[36rem] hover:opacity-100 active:opacity-100 border-8 border-solid border-white rounded-lg shadow-xl"
      >
        <Map
          defaultZoom={2}
          defaultCenter={{ lat: 0, lng: 0 }}
          disableDefaultUI={true}
          clickableIcons={false}
          onClick={!guessSubmitted ? placeGuessMarker : undefined}
          reuseMaps={true}
          mapId={MAP_ID}
        >
          {gameType === "SINGLE" && (
            <>
              {guessLocation && (
                <AdvancedMarker
                  position={guessLocation}
                  draggable={true}
                  onDragEnd={placeGuessMarker}
                  title="Your guess"
                />
              )}
              {answerLocation && (
                <AdvancedMarker
                  position={answerLocation}
                  title="Correct location"
                />
              )}
              {guessLocation && answerLocation && (
                <Polyline path={[guessLocation, answerLocation]} />
              )}
            </>
          )}
          {gameType === "VS" && (
            <>
              {guessLocation && (
                <AdvancedMarker
                  position={guessLocation}
                  draggable={!guessSubmitted}
                  onDragEnd={placeGuessMarker}
                  title="Your guess"
                />
              )}
            </>
          )}
        </Map>
        <Button
          color="green"
          className="rounded-full mt-4 w-full"
          onClick={!guessSubmitted ? submitGuess : undefined}
          disabled={guessLocation && !guessSubmitted ? false : true}
        >
          {guessLocation
            ? guessSubmitted
              ? "Waiting for the other player"
              : "Submit Guess"
            : "Place your pin on the map"}
        </Button>
      </div>
    </div>
  );
};

export default MapElement;
