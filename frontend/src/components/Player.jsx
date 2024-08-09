import { useState } from "react";
import { Button } from "@material-tailwind/react";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = () => {
  const [healthPoints, setHealthPoints] = useState(5000);

  const removeHp = () => {
    if (healthPoints === 0 || healthPoints - 1000 < 0) return;
    setHealthPoints(healthPoints - 1000);
  };

  const resetHp = () => setHealthPoints(5000);

  return (
    <div className="flex flex-col items-center container mx-auto">
      <Avatar />
      <h1 className="text-2xl font-bold ">Player name</h1>
      <HealthBar healthPoints={healthPoints} />
      <Button onClick={removeHp}>-1000</Button>
      <Button onClick={resetHp}>Reset</Button>
    </div>
  );
};

export default Player;
