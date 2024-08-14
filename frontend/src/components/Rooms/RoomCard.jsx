import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-black">
      <p>{room.title}</p>
      <p>{room.region}</p>
      <Button onClick={() => navigate(`/rooms/${room.region}`)}>
        Select room
      </Button>
    </div>
  );
};

export default RoomCard;
