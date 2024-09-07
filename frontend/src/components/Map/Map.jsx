import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Button, Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import EndRoundMap from "./EndRoundMap";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const MapElement = ({
  placeGuessMarker,
  guessLocation,
  answerLocation,
  submitGuess,
  isEnded,
}) => {
  const gameType = useSelector((state) => state.gameType);
  const { player1Guess, player2Guess } = useSelector(
    (state) => state.roundGuesses
  );

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

  if (isEnded && gameType === "VS") {
    return (
      <div
        style={{ transition: "all 0.5s" }}
        className="h-[100%] w-[100%] absolute z-10 top-0 bg-indigo-300 pb-36 px-12 md:px-56 xl:px-[30rem] xl:py-48"
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

  return (
    <div
      style={{ transition: "all 0.5s" }}
      className="h-72 w-96 absolute opacity-50 z-10 bottom-32 left-8 hover:h-[27rem] hover:w-[36rem] active:h-[27rem] active:w-[36rem] hover:opacity-100 active:opacity-100"
    >
      <Map
        defaultZoom={2}
        defaultCenter={{ lat: 0, lng: 0 }}
        disableDefaultUI={true}
        clickableIcons={false}
        onClick={placeGuessMarker}
        reuseMaps={true}
        mapId={MAP_ID}
      >
        {gameType === "SINGLE" && (
          <>
            {guessLocation && (
              <AdvancedMarker
                position={guessLocation}
                draggable={true}
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
                draggable={true}
                title="Your guess"
              />
            )}
          </>
        )}
      </Map>
      <Button
        color="green"
        className="rounded-full mt-2 w-full"
        onClick={submitGuess}
        disabled={guessLocation ? false : true}
      >
        {guessLocation ? "Submit Guess" : "Place your pin on the map"}
      </Button>
    </div>
  );
};

export default MapElement;
