import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RoomCard from "./RoomCard";
import { useSelector } from "react-redux";

const RoomsList = ({ rooms, roomCode }) => {
  const gameType = useSelector((state) => state.gameType);

  if (!gameType) return <div>Please choose game type first</div>;

  return (
    <div className="h-full bg-indigo-200 p-2">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 container mx-auto my-4">
        {rooms.map((room) => (
          <li key={room.id}>
            <div>
              <RoomCard room={room} roomCode={roomCode} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
