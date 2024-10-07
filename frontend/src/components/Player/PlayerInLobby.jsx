import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";

// this will need to be player name, avatar and player profile id to create a clickable link
const PlayerInLobby = ({ player, placeholderAvatarSrc, playerVariant }) => {
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div className="border border-gray-400 p-4 rounded-lg flex gap-4 items-center bg-indigo-300 shadow-md">
      <Avatar
        src={player && player.avatar ? player.avatar : placeholderAvatarSrc}
        alt="your guess location"
        withBorder={true}
        size="lg"
        className="border-white"
      />
      {player && player.username ? player.username : "Guest"}{" "}
      {playerVariant === playerVariantChecker && " (You)"}
    </div>
  );
};

export default PlayerInLobby;
