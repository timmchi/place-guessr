import { useState } from "react";
import SingleRound from "./SingleRound";

const SingleGame = ({ room }) => {
  const [round, setRound] = useState(1);
  const [gameEnded, setGameEnded] = useState(false);

  const handleRoundChange = (round) => {
    setRound(round);

    // in country maps, single player is allowed to play 5 rounds before the game ends
    if (room.region !== "random" && round > 5) {
      setTimeout(() => setGameEnded(true), 5000);
      //   setGameEnded(true);
    }
  };

  return (
    <div className="relative">
      <SingleRound
        round={round}
        handleRoundChange={handleRoundChange}
        roomMapType={room.region === "random" ? "world" : "country"}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        room={room}
      />
    </div>
  );
};

export default SingleGame;
