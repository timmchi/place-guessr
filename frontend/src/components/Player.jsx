import { useState } from "react";
import { Button } from "@material-tailwind/react";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = ({ player, healthPoints, removeHp, resetHp }) => {
  return (
    <div className="flex flex-col items-center container mx-auto p-2">
      <Avatar />
      <h1 className="text-2xl font-bold ">{player.name}</h1>
      <HealthBar healthPoints={healthPoints} />
      <div className="flex gap-2 pt-2">
        <Button onClick={removeHp}>-1000</Button>
        <Button onClick={resetHp}>Reset</Button>
      </div>
    </div>
  );
};

export default Player;
