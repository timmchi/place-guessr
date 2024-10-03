import { useState } from "react";
import Round from "./Round";

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
