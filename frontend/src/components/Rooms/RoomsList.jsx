import { rooms } from "../../data/rooms";
import { useState } from "react";
import Room from "./Room";
import { Button } from "@material-tailwind/react";

const RoomsList = ({ type }) => {
  const [chosenRoom, setChosenRoom] = useState(null);

  if (!type) return <div>Please choose game type first</div>;

  const chooseRoom = (roomId) => {
    console.log(roomId);
    console.log(rooms.find((room) => room.id === roomId));
    setChosenRoom(roomId);
  };

  if (!chosenRoom) {
    return (
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 p-2">
        {rooms.map((room) => (
          <li key={room.id}>
            <div>
              <Room room={room} type={type} chosen={false} />
              <Button variant="outlined" onClick={() => chooseRoom(room.id)}>
                Choose room
              </Button>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <Room
        room={rooms.find((room) => room.id === chosenRoom)}
        type={type}
        chosen={true}
      />
      <Button variant="outlined" onClick={() => setChosenRoom(null)}>
        Back to room selection
      </Button>
    </div>
  );
};

export default RoomsList;
