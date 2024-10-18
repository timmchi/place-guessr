import Avatar from "./Avatar";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../sockets/socket";
import { gameEnded } from "../../reducers/vsGameReducer";
import { createAvatarUrl } from "../../utils/playerUtils";

const WinnerScreen = ({ player }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameWinner = useSelector((state) => state.vsGame.vsGameWinner);
  const playerVariantChecker = useSelector((state) => state.player.player);
  const roomCode = useSelector((state) => state.roomCode);

  // maybe this could then have something like "user left" notification
  const handleGameFinish = () => {
    console.log("finishing the game", roomCode);

    // this event is used to clean up the room from the backend and save the game to the db
    // now i just need the room region here
    socket.emit("end game", roomCode);
    dispatch(gameEnded());
    navigate("/");
  };

  return (
    <div className="h-[100%] w-[100%] absolute z-20 top-0 bg-indigo-300 bg-opacity-80 flex pb-36 py-24 xl:py-48">
      <div className="flex flex-col mx-auto text-center items-center text-white">
        <Avatar
          gameType="vs"
          playerName={player && player.username ? player.username : "Guest"}
          imgLink={
            player && player.avatarName
              ? createAvatarUrl(player.avatarName)
              : createAvatarUrl()
          }
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
