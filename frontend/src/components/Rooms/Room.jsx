import SingleGame from "../SingleGame/SingleGame";
import VsGame from "../VsGame/VsGame";

const Room = ({ room, type, chosen }) => {
  if (!type) return <div>No room type chosen</div>;

  return (
    <div className="border-2 border-black text-xl">
      <p>{room.title}</p>
      <p>{room.region}</p>
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
