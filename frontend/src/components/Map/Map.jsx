import { useState } from "react";
import { Button } from "@material-tailwind/react";
import useRandomLocation from "../../hooks/useRandomLocation";

const Map = () => {
  const [apiType, setApiType] = useState(null);

  const { isLoading, data, refetch } = useRandomLocation(apiType);

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  const fetchGeolist = () => {
    setApiType("geolist");
    refetch();
  };

  const fetchGeonames = () => {
    setApiType("geonames");
    refetch();
  };

  return (
    <div>
      <h1>Map</h1>
      <p>
        lat: {data?.lat}, lng: {data?.lng}
      </p>
      <div className="flex">
        <Button variant="outlined" onClick={fetchGeolist}>
          Fetch with geolist
        </Button>
        <Button variant="outlined" onClick={fetchGeonames}>
          Fetch with geonames
        </Button>
      </div>
    </div>
  );
};

export default Map;
