import { Button } from "@material-tailwind/react";

const PanoramaErrorScreen = ({ handleNewLocationFetch }) => {
  return (
    <div className="bg-indigo-300 h-screen flex justify-center items-center flex-col gap-4 text-center text-white">
      <div>
        <h2 className="text-5xl font-bold">
          There was an error when loading street view
        </h2>
        <div className="text-2xl py-6">
          <p>No street view found for this location. Please try again.</p>
        </div>
      </div>
      <div className="flex gap-4 pt-2">
        <Button
          className="self-center bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
          onClick={handleNewLocationFetch}
        >
          Try to get another location
        </Button>
      </div>
    </div>
  );
};

export default PanoramaErrorScreen;
