import Avatar from "./Avatar";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { socket } from "../../sockets/socket";

// i want (YOU) here
const WinnerScreen = ({ player, roomCode }) => {
  //   const navigate = useNavigate();
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);
  const playerVariantChecker = useSelector((state) => state.player.player);

  // this doesnt have to be event based. Both players can press the button themselves and reset their own state. Perhaps this will get rid of the bug?
  const handleGameFinish = () => {
    console.log("finish the game");
    socket.emit("end game", roomCode);
    // navigate("/");
  };

  return (
    <div className="h-[100%] w-[100%] absolute z-10 top-0 bg-indigo-300 bg-opacity-80 flex pb-36 py-24 xl:py-48">
      <div className="flex flex-col mx-auto text-center items-center text-white">
        <Avatar
          gameType="vs"
          playerName={player && player.username ? player.username : "Guest"}
        />
        <div className="py-6">
          <h1 className="text-4xl font-bold ">
            {player && player.username ? player.username : "Guest"}{" "}
            {gameWinner === playerVariantChecker && " (You)"}
          </h1>
          <h3 className="text-6xl font-bold ">Victory!</h3>
        </div>
        <Button
          className="self-center w-full bg-amber-200 hover:bg-amber-400 text-indigo-500 text-md"
          onClick={handleGameFinish}
        >
          Finish the game
        </Button>
      </div>
    </div>
  );
};

export default WinnerScreen;
