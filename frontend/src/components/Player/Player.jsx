import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-tailwind/react";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = ({ player, healthPoints, gameType, score }) => {
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
          {score}
        </>
      )}
    </div>
  );
};

export default Player;
