import SingleGameHistoryElement from "../SingleGame/SingleGameHistoryElement";
import VsGameHistoryElement from "../VsGame/VsGameHistoryElement";

const UserGamesList = ({ games, type }) => {
  if (type === "SINGLE")
    return (
      <div>
        <h4 className="text-2xl md:text-3xl font-bold py-8">Single Games</h4>
        <div className="h-64 md:h-[28rem] overflow-y-scroll no-scrollbar">
          {games.map((game) => (
            <SingleGameHistoryElement game={game} key={game.id} />
          ))}
        </div>
      </div>
    );

  if (type === "DUEL")
    return (
      <div>
        <h4 className="text-2xl md:text-3xl font-bold py-8">Duel Games</h4>
        <div className="h-64 md:h-[28rem] overflow-y-scroll no-scrollbar">
          {games.map((game) => (
            <VsGameHistoryElement game={game} key={game.id} />
          ))}
        </div>
      </div>
    );
};

export default UserGamesList;
