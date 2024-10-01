import Avatar from "./Avatar";
import HealthBar from "./HealthBar";
import { useSelector } from "react-redux";

//   playerHealthPoints[0].player1.hp
//   playerHealthPoints[1].player2.hp

// this will go on top of the street view in the vs game
// i think this should be smaller, so different from end game player. I suppose health bar is the main culprit here, so different sizes for it
const PlayerOverlay = ({ player1, player2 }) => {
  const playerHealthPoints = useSelector((state) => state.hp);

  return (
    <div className="flex flex-col md:flex-row justify-between pt-2 px-2 text-white text-lg font-bold text-center opacity-85">
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          <Avatar imgLink={player1.avatar} />
          <HealthBar
            healthPoints={playerHealthPoints.player1HP}
            style="overlay"
          />
        </div>
        {player1.name}
      </div>
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          <HealthBar
            healthPoints={playerHealthPoints.player2HP}
            style="overlay"
          />
          <Avatar imgLink={player2.avatar} />
        </div>
        {player2.name}
      </div>
    </div>
  );
};

export default PlayerOverlay;
