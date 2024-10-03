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
}) => {
  const playerVariantChecker = useSelector((state) => state.player.player);

  return (
    <div
      className={`flex ${
        gameType === "vs" ? "flex-col" : "gap-4 w-64"
      } items-center container mx-auto text-white`}
    >
      {gameType === "vs" && (
        <h1 className="text-2xl font-bold ">
          {player && player.username ? player.username : "Guest"}{" "}
          {playerVariant === playerVariantChecker && " (You)"}
        </h1>
      )}
      <Avatar />
      {gameType === "single" && (
        <>
          <div className="text-xl font-bold">
            <p className="text-yellow-700 text-4xl">{Math.trunc(score)}</p>
            <p className="text-sm">out of 5000 points</p>
          </div>
        </>
      )}
      {gameType === "vs" && (
        <div className="text-center text-white">
          <div className="bg-blue-gray-300">
            <HealthBar healthPoints={healthPoints} />
          </div>
          <div>Score: {score}</div>
          <div>Distance from location: {distance} km</div>
        </div>
      )}
    </div>
  );
};

export default Player;
