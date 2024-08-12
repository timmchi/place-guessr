import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useMap } from "@vis.gl/react-google-maps";
import StreetView from "./StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

const LocationFetcher = ({ calculateScore, roomMapType }) => {
  // geolist backend api is suited more to the entire world map, as it is random points across the world, while geonames can be limited to a specific country, hence why it is used with the 'country' roomMapType
  const [apiType, setApiType] = useState(
    roomMapType === "world" ? "geolist" : "geonames"
  );
  const [location, setLocation] = useState({ lat: 45, lng: 45 });

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
          calculateScore={calculateScore}
          //   distance={distance}
          //   handleGuess={handleGuess}
        />
      )}
    </div>
  );
};

export default LocationFetcher;
