import { useSelector } from "react-redux";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = ({
  player,
  healthPoints,
  score,
  distance,
  playerVariant,
  placeholderAvatarSrc,
}) => {
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div className="flex flex-col items-center container mx-auto text-amber-300 gap-2 bg-indigo-400 rounded-xl py-14 px-4 shadow-xl border-2 border-amber-500 bg-opacity-85">
      <h1 className="text-2xl font-bold ">
        {player && player.username ? player.username : "Guest"}{" "}
        {playerVariant === playerVariantChecker && " (You)"}
      </h1>

      <Avatar imgLink={placeholderAvatarSrc} />

      <div className="text-center flex flex-col gap-1 text-xl">
        <HealthBar healthPoints={healthPoints} />
        <div className="pt-12 text-xl">
          <div>Score: {score}</div>
          <div>Distance from location: {distance} km</div>
        </div>
      </div>
    </div>
  );
};

export default Player;
