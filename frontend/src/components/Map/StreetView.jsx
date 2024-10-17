import { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  StreetViewPanorama,
  //   useJsApiLoader,
} from "@react-google-maps/api";
import MapElement from "./Map";

const StreetView = ({
  panoPosition,
  isEnded,
  placeGuessMarker,
  guessLocation,
  answerLocation,
  submitGuess,
  guessSubmitted,
}) => {
  const mapRef = useRef(null);
  const streetViewRef = useRef(null);
  //   const [pov, setPov] = useState({
  //     heading: 34,
  //     pitch: 10,
  //     zoom: 1,
  //   });

  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

  //   const handlePovChange = () => {
  //     if (streetViewRef.current) {
  //       const newPov = streetViewRef.current.getPov();
  //       if (
  //         newPov.heading !== pov.heading ||
  //         newPov.pitch !== pov.pitch ||
  //         newPov.zoom !== pov.zoom
  //       ) {
  //         setPov(newPov);
  //       }
  //     }
  //   };

  // unmount cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current = null;

      if (streetViewRef.current) streetViewRef.current = null;
    };
  }, []);

  const handlePovChange = () => {
    if (streetViewRef.current) {
      const newPov = streetViewRef.current.getPov();

      if (
        newPov.heading !== pov.heading ||
        newPov.pitch !== pov.pitch ||
        newPov.zoom !== pov.zoom
      ) {
        setPov(newPov);
      }
    }
  };

  return (
    <>
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
            // pov: pov,
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
          //   onPovChanged={handlePovChange}
        />
      </GoogleMap>
      <MapElement
        placeGuessMarker={placeGuessMarker}
        guessLocation={guessLocation}
        answerLocation={answerLocation}
        submitGuess={submitGuess}
        isEnded={isEnded}
        guessSubmitted={guessSubmitted}
      />
    </>
  );
};

export default StreetView;
