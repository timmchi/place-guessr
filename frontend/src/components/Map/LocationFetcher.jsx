import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useMap } from "@vis.gl/react-google-maps";
import StreetView from "./StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

const LocationFetcher = () => {
  const [apiType, setApiType] = useState(null);
  const [location, setLocation] = useState({ lat: 45, lng: 45 });
  const map = useMap();

  const { isLoading, data, refetch } = useRandomLocation(apiType);

  if (isLoading) return <div>Loading...</div>;

  const fetchLocation = () => {
    refetch();
    if (data) {
      setLocation({ lat: data.lat, lng: data.lng });
      map.setCenter({ lat: data.lat, lng: data.lng });
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
      {location && <StreetView location={location} />}
    </div>
  );
};

export default LocationFetcher;
