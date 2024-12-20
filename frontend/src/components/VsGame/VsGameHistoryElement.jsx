import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { rooms } from "../../data/rooms";
import { formatDate } from "../../utils/utils";

const VsGameHistoryElement = ({ game }) => {
  return (
    <div className="text-base border-2 border-white p-2 mx-4 md:w-[30rem] rounded-xl shadow-xl bg-indigo-300 flex gap-0 md:gap-6 items-center mt-2">
      <Avatar
        variant="circular"
        alt={`flag of ${game.map !== "random" ? game.map : "the world"}`}
        className="border-2 border-indigo-700"
        src={rooms.find((room) => room.region === game.map).flag}
      />
      <div className="flex flex-col md:text-lg w-48 font-bold">
        <p className="opacity-70">Score</p>
        <p className="md:text-xl">
          {game.player1Score} vs {game.player2Score}
        </p>
      </div>
      <div className="flex flex-col md:text-lg font-bold">
        <p className="opacity-70">Winner</p>
        <p className="md:text-xl">
          {game.winner.id ? (
            game.winner.id !== 1 ? (
              <Link to={`/${game.winner.id}`}>{game.winner.username}</Link>
            ) : (
              <>{game.winner.username}</>
            )
          ) : (
            "No Winner"
          )}
        </p>
      </div>
      <p className="text-sm md:text-base font-bold">{formatDate(game.date)}</p>
    </div>
  );
};

export default VsGameHistoryElement;
