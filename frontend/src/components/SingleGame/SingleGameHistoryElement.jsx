import { Avatar } from "@material-tailwind/react";
import { rooms } from "../../data/rooms";
import { formatDate } from "../../utils/utils";

const SingleGameHistoryElement = ({ game }) => {
  return (
    <div className="text-xl border-2 border-white p-2 mx-4 md:w-[30rem] rounded-xl shadow-xl bg-indigo-300 flex gap-10 items-center mt-2">
      <Avatar
        variant="circular"
        alt={`flag of ${game.map !== "random" ? game.map : "the world"}`}
        className="border-2 border-indigo-700"
        src={rooms.find((room) => room.region === game.map).flag}
      />
      <div className="flex flex-col text-lg font-bold">
        <p className="opacity-70">Score</p>
        <p className="text-xl">{game.player1Score}</p>
      </div>
      <div className="flex flex-col text-lg font-bold">
        <p className="opacity-70">Rounds</p>
        <p className="text-xl">{game.rounds}</p>
      </div>
      {/* <p>Rounds: {game.rounds}</p> */}
      <p className="text-base font-bold">{formatDate(game.date)}</p>
    </div>
  );
};

export default SingleGameHistoryElement;
