import { useState } from "react";
import { Button } from "@material-tailwind/react";
import Avatar from "./Avatar";

const Player = () => {
  const [healthPoints, setHealthPoints] = useState(5000);

  const removeHp = () => {
    if (healthPoints === 0 || healthPoints - 1000 < 0) return;
    setHealthPoints(healthPoints - 1000);
  };

  return (
    <div className="flex flex-col items-center container mx-auto">
      <Avatar />
      <h1 className="text-2xl font-bold ">Player name</h1>
      <p className="px-48 py-6 m-6 font-bold text-xl border-black border rounded">
        {healthPoints}
      </p>
      <Button onClick={removeHp}>-1000</Button>
    </div>
  );
};

export default Player;
