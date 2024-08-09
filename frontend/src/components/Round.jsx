import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RoundEndScreen from "./RoundEndScreen";

const Round = ({ players, round, handleNextRound }) => {
  const [isEnded, setIsEnded] = useState(false);
  const [player1HP, setPlayer1HP] = useState(5000);
  const [player2HP, setPlayer2HP] = useState(5000);

  const removeHp = (hp, removeHp) => {
    // if (healthPoints === 0 || healthPoints - 1000 < 0) return;
    // setHealthPoints(healthPoints - 1000);
    if (hp === 0 || hp - 1000 < 0) return;
    removeHp(hp - 1000);
  };

  const resetHp = (setHp) => setHp(5000);

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
      {isEnded && (
        <RoundEndScreen
          players={players}
          player1hp={player1HP}
          player2hp={player2HP}
          removePlayer1hp={() => removeHp(player1HP, setPlayer1HP)}
          removePlayer2hp={() => removeHp(player2HP, setPlayer2HP)}
          resetPlayer1hp={() => resetHp(setPlayer1HP)}
          resetPlayer2hp={() => resetHp(setPlayer2HP)}
        />
      )}
    </div>
  );
};

export default Round;
