import { Map } from "@vis.gl/react-google-maps";
import useStreetView from "../../hooks/useStreetView";

const StreetView = ({ location }) => {
  const streetViewService = useStreetView();

  //   if (!streetViewService) return <div>loading street view...</div>;

  const streetViewRequest = {
    location: location,
    radius: 50000,
  };

  console.log("location in streetview", location);

  return (
    <div className="border-2 border-black">
      <h2>Street view</h2>
      <div className="h-96">
        <Map
          defaultZoom={10}
          defaultCenter={location}
          disableDefaultUI={true}
        />
      </div>
    </div>
  );
};

export default StreetView;
