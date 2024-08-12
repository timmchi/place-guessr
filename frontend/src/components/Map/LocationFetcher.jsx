import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useMap } from "@vis.gl/react-google-maps";
import StreetView from "./StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

const LocationFetcher = ({ calculateScore, roomMapType }) => {
  // uncomment if checking whether the map loc is same as pano, otherwise no need
  //   const map = useMap();

  // geolist backend api is suited more to the entire world map, as it is random points across the world, while geonames can be limited to a specific country, hence why it is used with the 'country' roomMapType
  const { isLoading, data, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames"
  );

  if (isLoading) return <div>Loading...</div>;

  const fetchLocation = () => {
    refetch();
  };

  return (
    <div>
      <h1>LocationFetcher</h1>
      <p>
        lat: {data?.lat}, lng: {data?.lng}
      </p>
      <div className="flex">
        <Button variant="outlined" onClick={fetchLocation}>
          Fetch location
        </Button>
      </div>
      {data && (
        <StreetView
          location={{ lat: data.lat, lng: data.lng }}
          calculateScore={calculateScore}
        />
      )}
    </div>
  );
};

export default LocationFetcher;
