import { rooms } from "../../data/rooms";
import Room from "./Room";

const Rooms = () => {
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>
          <Room room={room} />
        </li>
      ))}
    </ul>
  );
};

export default Rooms;
