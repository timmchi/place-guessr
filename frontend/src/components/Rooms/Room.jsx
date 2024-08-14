import SingleGame from "../SingleGame/SingleGame";
import VsGame from "../VsGame/VsGame";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Room = ({ type, room }) => {
  const navigate = useNavigate();

  if (!type) return <div>No room type chosen</div>;

  if (!room) return <div>This room does not exist</div>;

  const goBackToRoomList = () => {
    console.log("navigating back to room list...");
    navigate("/rooms");
  };

  return (
    <div className="relative text-2xl font-bold text-white">
      <div className="absolute z-20 right-5 top-10 bg-indigo-800">
        <p>{room.title}</p>
        <p>{room.region}</p>
        <Button onClick={goBackToRoomList} className="bg-green-600">
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
