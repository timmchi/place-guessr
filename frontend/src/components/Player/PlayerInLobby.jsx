import { Avatar } from "@material-tailwind/react";
import placeholderAvatar2 from "../../../test/avatar2.jpg";
import placeholderAvatar1 from "../../../test/vavatar.jpg";

const avatars = [placeholderAvatar1, placeholderAvatar2];

// this will need to be player name, avatar and player profile id to create a clickable link
const PlayerInLobby = ({ player }) => {
  return (
    <div className="border border-gray-400 p-4 rounded-lg flex gap-4 items-center bg-indigo-300 shadow-md">
      <Avatar
        src={
          player && player.avatar
            ? player.avatar
            : avatars[Math.floor(Math.random() * avatars.length)]
        }
        alt="your guess location"
        withBorder={true}
        size="lg"
        className="border-white"
      />
      {player ? player.name : "Guest"}
    </div>
  );
};

export default PlayerInLobby;
