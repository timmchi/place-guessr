import { useState } from "react";
import SingleRound from "./SingleRound";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

const SingleGame = ({ roomMapType, region, roomTitle }) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  return (
    <div className="relative">
      {/* <div className="absolute z-10 right-5">
        <h1 className="text-2xl font-bold text-indigo-600">
          Playing a SINGLE game
        </h1>
      </div> */}
      <SingleRound
        player={players[0]}
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
