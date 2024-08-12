import { useState } from "react";
import SingleRound from "./SingleRound";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

const SingleGame = ({ roomMapType }) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  return (
    <div>
      <h1 className="text-2xl font-bold text-indigo-400">
        Playing a SINGLE game
      </h1>
      <SingleRound
        player={players[0]}
        round={round}
        handleRoundChange={handleRoundChange}
        roomMapType={roomMapType}
      />
    </div>
  );
};

export default SingleGame;
