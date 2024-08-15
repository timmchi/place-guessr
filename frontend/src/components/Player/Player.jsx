import { useState } from "react";
import { Button } from "@material-tailwind/react";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = ({
  player,
  healthPoints,
  removeHp,
  resetHp,
  gameType,
  score,
  round,
}) => {
  return (
    <div
      className={`flex ${
        gameType === "vs" ? "flex-col" : "gap-4 w-64"
      } items-center container mx-auto`}
    >
      {gameType === "vs" && (
        <h1 className="text-2xl font-bold ">{player.name}</h1>
      )}
      <Avatar />
      {gameType === "single" && (
        <>
          <div className="text-xl font-bold">
            <p className="text-yellow-700 text-4xl">{Math.trunc(score)}</p>
            <p className="text-sm">out of 5000 points</p>
          </div>
        </>
      )}
      {gameType === "vs" && (
        <>
          <HealthBar healthPoints={healthPoints} />
          <div className="flex gap-2 pt-2">
            <Button onClick={removeHp}>-1000</Button>
            <Button onClick={resetHp}>Reset</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
