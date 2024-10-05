import { useState } from "react";
import SingleRound from "./SingleRound";

const SingleGame = ({ roomMapType, region, roomTitle }) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  return (
    <div className="relative">
      <SingleRound
        round={round}
        handleRoundChange={handleRoundChange}
        roomMapType={roomMapType}
        region={region}
        roomTitle={roomTitle}
      />
    </div>
  );
};

export default SingleGame;
