import { useSelector } from "react-redux";
import HealthBar from "./HealthBar";
import Avatar from "./Avatar";

const Player = ({
  player,
  healthPoints,
  gameType,
  score,
  distance,
  playerVariant,
  placeholderAvatarSrc,
}) => {
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div className="flex flex-col items-center container mx-auto text-white gap-2">
      <h1 className="text-2xl font-bold ">
        {player && player.username ? player.username : "Guest"}{" "}
        {playerVariant === playerVariantChecker && " (You)"}
      </h1>

      <Avatar imgLink={placeholderAvatarSrc} />

      <div className="text-center text-white flex flex-col gap-1 text-xl">
        <HealthBar healthPoints={healthPoints} />
        <div>Score: {score}</div>
        <div>Distance from location: {distance} km</div>
      </div>
    </div>
  );
};

export default Player;
