import { useEffect, useState, useRef } from "react";
import useStreetView from "../../hooks/useStreetView";
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import { haversine_distance } from "../../utils/scoreUtils";
import MapElement from "./Map";
import { Button } from "@material-tailwind/react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const StreetView = ({ location, calculateScore, onRoundEnd }) => {
  const streetViewService = useStreetView();
  const [panoPosition, setPanoPosition] = useState(null);
  const [guessLocation, setGuessLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);

  let distance;

  if (answerLocation && guessLocation)
    distance = Math.trunc(haversine_distance(guessLocation, answerLocation));

  const mapRef = useRef(null);
  const streetViewRef = useRef(null);

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY });

  const containerStyle = {
    height: "100vh",
    width: "99.1vw",
  };

  useEffect(() => {
    if (!location || !streetViewService) return;

    const streetViewRequest = {
      location: location,
      radius: 5000,
    };

    streetViewService.getPanorama(streetViewRequest, (data, status) => {
      if (status === "OK" && data && data.location && data.location.latLng) {
        const panoLoc = data.location.latLng.toJSON();

        // console.log("panoLoc", panoLoc);
        setPanoPosition(panoLoc);
        // console.log("panoPosition", panoPosition);
      } else {
        console.log("No street view for this location");
      }
    });
  }, [location, streetViewService]);

  // unmount cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current = null;

      if (streetViewRef.current) streetViewRef.current = null;
    };
  }, []);

  if (!isLoaded) return null;

  //   console.log("panoPosition outside", panoPosition);

  const placeGuessMarker = (e) => {
    const { latLng } = e.detail;
    setGuessLocation(latLng);
    console.log(latLng);
  };

  const submitGuess = () => {
    console.log("submitting answer, ending round...");
    const updatedAnswerLocation = panoPosition;

    setAnswerLocation(updatedAnswerLocation);

    const distanceResult = Math.trunc(
      haversine_distance(guessLocation, updatedAnswerLocation)
    );

    console.log("guess location in submit guess", guessLocation);
    console.log("answer location in submit guess", updatedAnswerLocation);

    calculateScore(distanceResult);
  };

  const handleEndRound = () => {
    onRoundEnd();
    setGuessLocation(null);
    setAnswerLocation(null);
  };

  return (
    <div className="">
      <div className="relative">
        <div className="absolute z-10 top-1/2 right-2">
          {distance && (
            <p className="text-2xl font-bold text-indigo-400">
              Distance: {distance} km
            </p>
          )}
          <Button
            className="bg-indigo-400 hover:bg-indigo-600"
            onClick={handleEndRound}
          >
            Next round
          </Button>
        </div>
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
          submitGuess={submitGuess}
        />
      </div>
    </div>
  );
};

export default StreetView;
