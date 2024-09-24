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
    <div className="flex justify-between pt-2 px-2 text-white text-xl font-bold text-center">
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg p-2 rounded-xl gap-2 justify-center items-center">
          <Avatar imgLink={player1.avatar} />
          <HealthBar healthPoints={playerHealthPoints[0].player1.hp} />
        </div>
        {player1.name}
      </div>
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg p-2 rounded-xl gap-2 justify-center items-center">
          <HealthBar healthPoints={playerHealthPoints[1].player2.hp} />
          <Avatar imgLink={player2.avatar} />
        </div>
        {player2.name}
      </div>
    </div>
  );
};

export default PlayerOverlay;
