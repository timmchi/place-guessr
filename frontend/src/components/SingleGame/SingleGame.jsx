import { useState } from "react";
import SingleRound from "./SingleRound";

const SingleGame = ({ room }) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  return (
    <div className="relative">
      <SingleRound
        round={round}
        handleRoundChange={handleRoundChange}
        roomMapType={room.region === "random" ? "world" : "country"}
        room={room}
      />
    </div>
  );
};

export default SingleGame;
