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
}) => {
  return (
    <div
      className={`flex ${
        gameType === "vs" ? "flex-col" : "gap-4"
      } items-center container mx-auto p-2`}
    >
      {gameType === "vs" && (
        <h1 className="text-2xl font-bold ">{player.name}</h1>
      )}
      <Avatar />
      {gameType === "single" && (
        <>
          <div className="text-2xl font-bold">Score {Math.trunc(score)}</div>
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
