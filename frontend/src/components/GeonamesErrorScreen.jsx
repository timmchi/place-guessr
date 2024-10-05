import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const GeonamesErrorScreen = ({ error, refetch }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-indigo-300 h-screen flex justify-center items-center flex-col gap-4 text-center ">
      <div className="text-3xl">
        <h2>Error fetching location</h2>
        <p>Geonames went bust!</p>
        <p>Error: {error.message}</p>
      </div>
      <div className="flex gap-4 pt-2">
        {/* due to the fact that vsgame has a different way of getting the location, it will not have the options to refetch. Perhaps a different mechanism of trying for a new location will be implemented, but for now the only option will be to go to the main page */}
        {refetch && (
          <Button
            className="self-center bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
            onClick={() => refetch()}
          >
            Try to get another location
          </Button>
        )}
        <Button
          className="self-center bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
          onClick={() => navigate("/")}
        >
          Back to the main page
        </Button>
      </div>
    </div>
  );
};

export default GeonamesErrorScreen;
