import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const GeonamesErrorScreen = ({ error, refetch, handleGeonamesError }) => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    // this part is only for vsGame, we need extra steps to reset its complex state
    if (handleGeonamesError) handleGeonamesError(null);
    navigate("/");
  };
  return (
    <div className="bg-indigo-300 h-screen flex justify-center items-center flex-col gap-4 text-center text-white">
      <div>
        <h2 className="text-5xl font-bold">
          There was an error when fetching location
        </h2>
        <div className="text-2xl py-6">
          <p>
            Placeguessr uses an external API to fetch random locations for the
            country-based rooms.
          </p>
          <p>
            When that API is not available, you will see this error. Best time
            to play country-based rooms is after 9PM EEST.
          </p>
          <p>
            Please try again later and in the meantime you can play The Entire
            World Map with no interruptions.
          </p>
        </div>
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
          onClick={goToMainPage}
        >
          Back to the main page
        </Button>
      </div>
    </div>
  );
};

export default GeonamesErrorScreen;
