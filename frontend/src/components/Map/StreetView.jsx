import { useEffect, useState } from "react";
import useStreetView from "../../hooks/useStreetView";
import {
  GoogleMap,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";
import { haversine_distance } from "../../utils/scoreUtils";
import MapElement from "./Map";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const StreetView = ({ location }) => {
  const streetViewService = useStreetView();
  const [panoPosition, setPanoPosition] = useState(null);
  const [guessLocation, setGuessLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);
  const [distance, setDistance] = useState(0);

  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: API_KEY });

  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

  //   console.log("location in streetview", location);

  useEffect(() => {
    if (!location || !streetViewService) return;

    const streetViewRequest = {
      location: location,
      radius: 50000,
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

  useEffect(() => {
    if (answerLocation && guessLocation) calculateDistance();
  }, [answerLocation]);

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
    console.log("guess location in submit guess", guessLocation);
    console.log("answer location in submit guess", answerLocation);
    setTimeout(() => {
      setGuessLocation(null);
      setAnswerLocation(null);
    }, 5000);
  };

  const calculateDistance = () => {
    const distanceResult = Math.trunc(
      haversine_distance(guessLocation, answerLocation)
    );
    setDistance(distanceResult);
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
