import Avatar from "./Avatar";
import HealthBar from "./HealthBar";
import { useSelector } from "react-redux";
import avatar from "../../../test/vavatar.jpg";
import avatar2 from "../../../test/avatar2.jpg";

// this will go on top of the street view in the vs game
// i think this should be smaller, so different from end game player. I suppose health bar is the main culprit here, so different sizes for it
const PlayerOverlay = ({ player1, player2 }) => {
  const playerHealthPoints = useSelector((state) => state.hp);

  return (
    <div className="flex flex-col md:flex-row justify-between pt-2 px-2 text-white text-lg font-bold text-center opacity-85">
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          {/* hack for now */}
          <Avatar imgLink={avatar} />
          <HealthBar
            healthPoints={playerHealthPoints.player1HP}
            style="overlay"
          />
        </div>
        {player1 && player1.username ? player1.username : "Guest"}
      </div>
      <div className="flex flex-col">
        <div className="flex bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-700 text-white shadow-lg py-1 px-2 rounded-xl gap-2 justify-center items-center">
          <HealthBar
            healthPoints={playerHealthPoints.player2HP}
            style="overlay"
          />
          {/* hack for now */}
          <Avatar imgLink={avatar2} />
        </div>
        {player2 && player2.username ? player2.username : "Guest"}
      </div>
    </div>
  );
};

export default PlayerOverlay;
