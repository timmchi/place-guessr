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

  const containerStyle = {
    height: "100vh",
    width: "100vw",
  };

  // unmount cleanup
  useEffect(() => {
    return () => {
      if (mapRef.current) mapRef.current = null;

      if (streetViewRef.current) streetViewRef.current = null;
    };
  }, []);

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
        isEnded={isEnded}
        guessSubmitted={guessSubmitted}
      />
    </>
  );
};

export default StreetView;
