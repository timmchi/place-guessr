import { useState } from "react";

const Player = () => {
  const [healthPoints, setHealthPoints] = useState(5000);

  const removeHp = () => {
    if (healthPoints === 0 || healthPoints - 1000 < 0) return;
    setHealthPoints(healthPoints - 1000);
  };

  return (
    <div className="flex flex-col items-center container mx-auto">
      <h1 className="text-2xl font-bold ">Player name</h1>
      <p className="px-48 py-6 m-6 font-bold text-xl border-black border rounded">
        {healthPoints}
      </p>
      <button onClick={removeHp}>-1000</button>
    </div>
  );
};

export default Player;
