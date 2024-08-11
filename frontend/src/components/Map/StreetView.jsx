import { Map, useMap, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import useStreetView from "../../hooks/useStreetView";
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Button } from "@material-tailwind/react";
import { Polyline } from "./Polyline";
import { haversine_distance } from "../../utils/scoreUtils";

const MAP_ID = import.meta.env.VITE_MAP_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const StreetView = ({ location }) => {
  const streetViewService = useStreetView();
  const [panoPosition, setPanoPosition] = useState(null);
  const [guessLocation, setGuessLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  //   const map = useMap();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY });

  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

  //   console.log("location in streetview", location);

  useEffect(() => {
    if (!location || !streetViewService) return;

    console.log("location in effect", location);

    // map.setCenter(location);

    const streetViewRequest = {
      location: location,
      radius: 50000,
    };

    streetViewService.getPanorama(streetViewRequest, (data, status) => {
      if (status === "OK" && data && data.location && data.location.latLng) {
        const panoLoc = data.location.latLng.toJSON();

        console.log("panoLoc", panoLoc);
        setPanoPosition(panoLoc);
        // console.log("panoPosition", panoPosition);
      } else {
        console.log("No street view for this location");
      }
    });
  }, [location, streetViewService]);

  if (!isLoaded) return null;

  //   console.log("panoPosition outside", panoPosition);

  const placeGuessMarker = (e) => {
    const { latLng } = e.detail;
    setGuessLocation(latLng);
    console.log(latLng);
  };

  const submitGuess = () => {
    console.log("submitting answer, ending round...");
    setAnswerLocation(panoPosition);
    // setTimeout(() => {
    //   setGuessLocation(null);
    //   setAnswerLocation(null);
    // }, 3000);
    console.log("guess location", guessLocation);
    console.log("answer location", answerLocation);
    setDistance(Math.trunc(haversine_distance(guessLocation, answerLocation)));
  };

  return (
    <div className="border-2 border-black m-4 p-2">
      <h2>Street view</h2>
      <p className="text-2xl font-bold text-indigo-400">
        Distance: {distance} km
      </p>
      <div className="relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={panoPosition}
          zoom={10}
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
            }}
          />
        </GoogleMap>
        <div
          style={{ transition: "all 0.5s" }}
          className="h-72 w-96 absolute opacity-50 z-10 bottom-32 left-8 hover:scale-125 hover:left-16 active:scale-125 hover:opacity-100"
        >
          <Map
            defaultZoom={7}
            defaultCenter={location}
            disableDefaultUI={true}
            clickableIcons={false}
            onClick={placeGuessMarker}
            reuseMaps={true}
            mapId={MAP_ID}
          >
            {guessLocation && (
              <AdvancedMarker position={guessLocation} draggable={true} />
            )}
            {answerLocation && <AdvancedMarker position={answerLocation} />}
            {answerLocation && (
              <Polyline path={[guessLocation, answerLocation]} />
            )}
          </Map>
          <Button
            color="green"
            className="rounded-full mt-2 w-full"
            onClick={submitGuess}
            disabled={guessLocation ? false : true}
          >
            {guessLocation ? "Submit Guess" : "Make a Guess"}
          </Button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default StreetView;
