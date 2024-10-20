import { Avatar } from "@material-tailwind/react";
import { rooms } from "../../data/rooms";
import { formatDate } from "../../utils/utils";

const SingleGameHistoryElement = ({ game }) => {
  return (
    <div className="text-xl border-2 border-white p-2 w-[30rem] rounded-xl shadow-xl bg-indigo-300 flex gap-6 items-center mt-2">
      <Avatar
        variant="circular"
        alt={`flag of ${game.map !== "random" ? game.map : "the world"}`}
        className="border-2 border-indigo-700"
        src={rooms.find((room) => room.region === game.map).flag}
      />
      <p className="font-bold">Score: {game.player1Score}</p>
      <p>Rounds: {game.rounds}</p>
      <p>{formatDate(game.date)}</p>
    </div>
  );
};

export default SingleGameHistoryElement;
