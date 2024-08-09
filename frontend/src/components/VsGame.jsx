import { useState } from "react";
import Round from "./Round";
import { Button } from "@material-tailwind/react";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

const VsGame = () => {
  const [round, setRound] = useState(1);
  const [winner, setWinner] = useState(null);

  const handleRoundChange = (round) => setRound(round);

  const handleGameWin = (winner) => setWinner(winner);

  return (
    <div>
      <Round
        players={players}
        round={round}
        handleRoundChange={handleRoundChange}
        winner={winner}
        handleGameWin={handleGameWin}
        handleReset={() => setWinner(null)}
      />
    </div>
  );
};

export default VsGame;
