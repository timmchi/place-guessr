import { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import StreetView from "./StreetView";
import useRandomLocation from "../../hooks/useRandomLocation";

// I DONT USE THIS ANYMORE
const LocationFetcher = ({
  calculateScore,
  roomMapType,
  onRoundEnd,
  setRefetch,
  region,
}) => {
  // geolist backend api is suited more to the entire world map, as it is random points across the world, while geonames can be limited to a specific country, hence why it is used with the 'country' roomMapType
  const { isLoading, data, refetch } = useRandomLocation(
    roomMapType === "world" ? "geolist" : "geonames",
    region && region
  );

  // I dont like this, need to find a way to make fetching new street view on round start better
  //   useEffect(() => {
  //     if (setRefetch) {
  //       setRefetch(() => refetch);
  //     }
  //   }, [refetch, setRefetch]);

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
          onRoundEnd={onRoundEnd}
        />
      )}
    </div>
  );
};

export default LocationFetcher;
