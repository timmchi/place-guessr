import UserGamesList from "./UserGamesList";

const UserMatchHistory = ({ games }) => {
  return (
    <div className="my-[1rem] lg:my-[4.6rem]">
      <h3 className="text-3xl md:text-4xl font-bold text-center">
        Match History
      </h3>
      <div className="flex flex-col lg:flex-row justify-between xl:w-[62rem] text-center">
        {/* for both single and duels, last 5(10?) games with functionality to load more and scroll */}
        <UserGamesList
          type="SINGLE"
          games={games.filter((game) => game.gameType === "SINGLE")}
        />
        <UserGamesList
          type="DUEL"
          games={games.filter((game) => game.gameType === "DUEL")}
        />
      </div>
    </div>
  );
};

export default UserMatchHistory;
