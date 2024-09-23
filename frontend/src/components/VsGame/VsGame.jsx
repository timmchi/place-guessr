import { useState } from "react";
import Round from "./Round";

const players = [
  { id: 1, name: "Kariz" },
  { id: 2, name: "Sheldon" },
];

const VsGame = ({
  roomMapType,
  region,
  roomTitle,
  vsGameLocation,
  //   vsRoundEnded,
  roomCode,
}) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  return (
    <div>
      <Round
        players={players}
        round={round}
        handleRoundChange={handleRoundChange}
        region={region}
        roomMapType={roomMapType}
        roomTitle={roomTitle}
        vsGameLocation={vsGameLocation}
        roomCode={roomCode}
      />
    </div>
  );
};

export default VsGame;
