import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { Polyline } from "./Polyline";
import { Button } from "@material-tailwind/react";

const MAP_ID = import.meta.env.VITE_MAP_ID;

const MapElement = ({
  placeGuessMarker,
  guessLocation,
  answerLocation,
  submitGuess,
}) => {
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
        {guessLocation && (
          <AdvancedMarker
            position={guessLocation}
            draggable={true}
            title="Your guess"
          />
        )}
        {answerLocation && (
          <AdvancedMarker position={answerLocation} title="Correct location" />
        )}
        {answerLocation && <Polyline path={[guessLocation, answerLocation]} />}
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
