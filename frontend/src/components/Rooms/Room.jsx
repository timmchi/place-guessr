import SingleGame from "../SingleGame/SingleGame";
import VsGame from "../VsGame/VsGame";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Room = ({ type, room }) => {
  const navigate = useNavigate();

  if (!type) return <div>No room type chosen</div>;

  if (!room) return <div>This room does not exist</div>;

  return (
    <div className="relative text-2xl font-bold text-green-900">
      <div className="absolute z-10 right-5 top-10">
        <p>{room.title}</p>
        <p>{room.region}</p>
        <Button
          variant="outlined"
          onClick={() => navigate("/rooms")}
          className="absolute z-10 top-28 right-5"
        >
          Back to room selection
        </Button>
      </div>
      {type === "VS" ? (
        <VsGame roomMapType={room.region === "random" ? "world" : "country"} />
      ) : (
        <SingleGame
          roomMapType={room.region === "random" ? "world" : "country"}
          region={room.region !== "random" && room.region}
        />
      )}
    </div>
  );
};

export default Room;
