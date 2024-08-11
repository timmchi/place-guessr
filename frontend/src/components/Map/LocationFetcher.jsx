import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useMap } from "@vis.gl/react-google-maps";
import StreetView from "./StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

const LocationFetcher = () => {
  const [apiType, setApiType] = useState(null);
  const [location, setLocation] = useState({ lat: 45, lng: 45 });
  //   const [distance, setDistance] = useState(0);

  // uncomment if checking whether the map loc is same as pano, otherwise no need
  //   const map = useMap();

  const { isLoading, data, refetch } = useRandomLocation(apiType);

  if (isLoading) return <div>Loading...</div>;

  const fetchLocation = () => {
    refetch();
    if (data) {
      setLocation({ lat: data.lat, lng: data.lng });
      // uncomment if checking whether the map loc is same as pano, otherwise no need
      //   map.setCenter({ lat: data.lat, lng: data.lng });
    }
  };

  //   const handleGuess = (d) => {
  //     setDistance(d);
  //   };

  return (
    <div>
      <h1>LocationFetcher</h1>
      <p>
        lat: {data?.lat}, lng: {data?.lng}
      </p>
      <div className="flex">
        <Button variant="outlined" onClick={() => setApiType("geolist")}>
          set to geolist
        </Button>
        <Button variant="outlined" onClick={() => setApiType("geonames")}>
          set to geonames
        </Button>
        <Button variant="outlined" onClick={fetchLocation}>
          Fetch location
        </Button>
      </div>
      {location && (
        <StreetView
          location={location}
          //   distance={distance}
          //   handleGuess={handleGuess}
        />
      )}
    </div>
  );
};

export default LocationFetcher;
