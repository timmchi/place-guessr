import Avatar from "./Avatar";
import HealthBar from "./HealthBar";
import { useSelector } from "react-redux";
import { createAvatarUrl } from "../../utils/playerUtils";

// i want (YOU) here
const PlayerOverlay = ({ player1, player2 }) => {
  const playerHealthPoints = useSelector((state) => state.hp);
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div className="flex flex-col md:flex-row justify-between pt-2 px-2 text-white text-lg font-bold text-center opacity-85">
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          <Avatar
            imgLink={
              player1 && player1.avatarName
                ? createAvatarUrl(player1.avatarName)
                : createAvatarUrl()
            }
          />
          <HealthBar
            healthPoints={playerHealthPoints.player1HP}
            style="overlay"
          />
        </div>
        {player1 && player1.username ? player1.username : "Guest"}{" "}
        {playerVariantChecker === "p1" && " (You)"}
      </div>
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          <HealthBar
            healthPoints={playerHealthPoints.player2HP}
            style="overlay"
          />
          <Avatar
            imgLink={
              player2 && player2.avatarName
                ? createAvatarUrl(player2.avatarName)
                : createAvatarUrl()
            }
          />
        </div>
        {player2 && player2.username ? player2.username : "Guest"}{" "}
        {playerVariantChecker === "p2" && " (You)"}
      </div>
    </div>
  );
};

export default PlayerOverlay;
