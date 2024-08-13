import SingleGame from "../SingleGame/SingleGame";
import VsGame from "../VsGame/VsGame";

const Room = ({ room, type, chosen }) => {
  if (!type) return <div>No room type chosen</div>;

  return (
    <div className="relative text-2xl font-bold text-indigo-600">
      <div className="absolute z-10 right-5 top-10">
        <p>{room.title}</p>
        <p>{room.region}</p>
      </div>
      {chosen &&
        (type === "VS" ? (
          <VsGame
            roomMapType={room.region === "random" ? "world" : "country"}
          />
        ) : (
          <SingleGame
            roomMapType={room.region === "random" ? "world" : "country"}
            region={room.region !== "random" && room.region}
          />
        ))}
    </div>
  );
};

export default Room;
