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
    <div className="flex flex-col items-center container mx-auto text-amber-300 gap-2 bg-indigo-400 rounded-xl py-4 xl:py-14 px-4 shadow-xl border-2 border-amber-500 bg-opacity-85">
      <div className="flex flex-row-reverse justify-center items-center gap-4 xl:flex-col">
        <h1 className="text-lg xl:text-2xl font-bold ">
          {player && player.username ? player.username : "Guest"}{" "}
          {playerVariant === playerVariantChecker && " (You)"}
        </h1>
        <Avatar imgLink={placeholderAvatarSrc} />
      </div>

      <div className="text-center flex flex-col gap-1 text-lg xl:text-xl">
        <HealthBar healthPoints={healthPoints} />
        <div className="xl:pt-12">
          <div>Score: {score}</div>
          <div>Distance from location: {distance} km</div>
        </div>
      </div>
    </div>
  );
};

export default Player;
