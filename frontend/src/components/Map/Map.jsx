import { useState } from "react";
import { Button } from "@material-tailwind/react";
import useRandomLocation from "../../hooks/useRandomLocation";

const Map = () => {
  const [apiType, setApiType] = useState(null);

  const { isLoading, data, refetch } = useRandomLocation(apiType);

  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <h1>Map</h1>
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
        <Button variant="outlined" onClick={refetch}>
          Fetch location
        </Button>
      </div>
    </div>
  );
};

export default Map;
