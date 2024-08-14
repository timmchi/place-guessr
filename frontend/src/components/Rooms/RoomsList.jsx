import { useState } from "react";
import { Button } from "@material-tailwind/react";
import RoomCard from "./RoomCard";

const RoomsList = ({ type, rooms }) => {
  if (!type) return <div>Please choose game type first</div>;

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-4 container mx-auto">
      {rooms.map((room) => (
        <li key={room.id}>
          <div>
            <RoomCard room={room} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RoomsList;
