import { useState } from "react";
import Round from "./Round";

const VsGame = ({ roomMapType, region, roomTitle, vsGameLocation }) => {
  const [round, setRound] = useState(1);

  const handleRoundChange = (round) => setRound(round);

  // so, the wrong location will flow to here, and I think it would make sense to render the error screen here. This will avoid using streetviewservice call at all

  console.log("location in vsGameLocation", vsGameLocation);

  return (
    <div>
      <Round
        round={round}
        handleRoundChange={handleRoundChange}
        region={region}
        roomMapType={roomMapType}
        roomTitle={roomTitle}
        vsGameLocation={vsGameLocation}
      />
    </div>
  );
};

export default VsGame;
