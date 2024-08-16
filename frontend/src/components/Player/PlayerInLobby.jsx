import { Avatar } from "@material-tailwind/react";

const PlayerInLobby = ({ player }) => {
  return (
    <div className="border border-gray-400 p-4 rounded-lg flex gap-4 items-center bg-indigo-300">
      <Avatar
        src={player.avatar}
        alt="your guess location"
        withBorder={true}
        size="lg"
        className="border-white"
      />
      {player.name}
    </div>
  );
};

export default PlayerInLobby;
