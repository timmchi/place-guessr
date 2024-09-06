import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Button, Avatar } from "@material-tailwind/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import avatar from "../../../test/vavatar.jpg";
import avatar2 from "../../../test/avatar2.jpg";
import { useSelector } from "react-redux";

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

  if (isEnded) {
    return (
      <div
        style={{ transition: "all 0.5s" }}
        className="h-[100%] w-[100%] absolute z-10 top-0 bg-indigo-300 pb-36"
      >
        <Map
          defaultZoom={2}
          defaultCenter={{ lat: 0, lng: 0 }}
          disableDefaultUI={true}
          clickableIcons={false}
          reuseMaps={true}
          mapId={MAP_ID}
        >
          {gameType === "SINGLE" && (
            <>
              <AdvancedMarker position={guessLocation} title="Your guess">
                <Avatar
                  src={avatar}
                  alt="your guess location"
                  withBorder={true}
                  size="sm"
                />
              </AdvancedMarker>

              <AdvancedMarker
                position={answerLocation}
                title="Correct location"
              >
                <IoCheckmarkCircleSharp
                  style={{ padding: 0, margin: 0 }}
                  className="text-green-400 h-[2.3rem] w-[2.3rem] rounded-full border-2 border-black bg-green-800"
                />
              </AdvancedMarker>

              <Polyline path={[guessLocation, answerLocation]} />
            </>
          )}
          {gameType === "VS" && (
            // perhaps checks for player1guess and player2guess existing should be implemented
            <>
              <AdvancedMarker position={player1Guess} title="Player 1's guess">
                <Avatar
                  src={avatar}
                  alt="Player 1's avatar"
                  withBorder={true}
                  size="sm"
                />
              </AdvancedMarker>
              <AdvancedMarker position={player2Guess} title="Player 2's guess">
                <Avatar
                  src={avatar2}
                  alt="Player 2's avatar"
                  withBorder={true}
                  size="sm"
                />
              </AdvancedMarker>

              <AdvancedMarker
                position={answerLocation}
                title="Correct location"
              >
                <IoCheckmarkCircleSharp
                  style={{ padding: 0, margin: 0 }}
                  className="text-green-400 h-[2.3rem] w-[2.3rem] rounded-full border-2 border-black bg-green-800"
                />
              </AdvancedMarker>

              <Polyline path={[player1Guess, answerLocation]} />
              <Polyline path={[player2Guess, answerLocation]} />
            </>
          )}
        </Map>
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
