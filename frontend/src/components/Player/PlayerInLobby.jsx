import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { createAvatarUrl } from "../../utils/playerUtils";

// this will need to be player name, avatar and player profile id to create a clickable link
const PlayerInLobby = ({ player, playerVariant }) => {
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div className="border border-gray-400 mx-2 p-2 md:p-4 rounded-lg flex gap-2 md:gap-4 items-center bg-indigo-300 shadow-md font-bold w-44 text-lg md:text-xl">
      <Avatar
        src={
          player && player.avatarName
            ? createAvatarUrl(player.avatarName)
            : createAvatarUrl()
        }
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
