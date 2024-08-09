import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RoundEndScreen from "./RoundEndScreen";

const Round = ({ players, round, handleNextRound }) => {
  const [isEnded, setIsEnded] = useState(false);

  const endRound = () => {
    setIsEnded(true);
    handleNextRound();
  };

  const startRound = () => {
    setIsEnded(false);
  };

  return (
    <div>
      {!isEnded && (
        <>
          <h1 className="text-4xl font-bold">Round {round}</h1>
          <Button onClick={endRound}>End round</Button>
        </>
      )}
      {isEnded && <Button onClick={startRound}>Start round</Button>}
      {isEnded && <RoundEndScreen players={players} />}
    </div>
  );
};

export default Round;
