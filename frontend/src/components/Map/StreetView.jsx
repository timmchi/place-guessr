import { Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import useStreetView from "../../hooks/useStreetView";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

const StreetView = ({ location }) => {
  const streetViewService = useStreetView();
  const [panoPosition, setPanoPosition] = useState(null);

  const containerStyle = {
    height: "400px",
    width: "800px",
  };

  console.log("location in streetview", location);

  useEffect(() => {
    if (!location || !streetViewService) return;

    const streetViewRequest = {
      location: location,
      radius: 50000,
    };

    streetViewService.getPanorama(streetViewRequest, (data, status) => {
      if (status === "OK" && data && data.location && data.location.latLng) {
        const panoLoc = data.location.latLng.toJSON();

        console.log("panoLoc", panoLoc);
        setPanoPosition(panoLoc);
        console.log("panoPosition", panoPosition);
      } else {
        console.log("No street view for this location");
      }
    });
  }, [location, streetViewService]);

  console.log("panoPosition outside", panoPosition);

  return (
    <div className="border-2 border-black m-4 p-2">
      <h2>Street view</h2>
      <Map defaultZoom={10} defaultCenter={location} disableDefaultUI={true} />
      {panoPosition && (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={panoPosition}
            zoom={10}
          >
            <StreetViewPanorama
              mapContainerStyle={containerStyle}
              position={panoPosition}
              visible={true}
            />
          </GoogleMap>
        </>
      )}
    </div>
  );
};

export default StreetView;
