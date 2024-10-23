import UserGamesList from "./UserGamesList";
import Pagination from "../SmallComponents/Pagination";

const UserMatchHistory = ({
  singleGames,
  duelGames,
  singlePage,
  duelPage,
  setActiveSinglePage,
  setActiveDuelPage,
  totalSingleGames,
  totalDuelGames,
}) => {
  return (
    <div className="my-[1rem] lg:my-[4.6rem]">
      <h3 className="text-3xl md:text-4xl font-bold text-center">
        Match History
      </h3>
      <div className="flex flex-col lg:flex-row justify-between xl:w-[62rem] text-center">
        {/* for both single and duels, last 5(10?) games with functionality to load more and scroll */}
        <div className="flex flex-col items-center">
          <UserGamesList type="SINGLE" games={singleGames} />
          <Pagination
            // for pages here, we need total Math.ceil(totalSingleGames / 5)
            pages={Math.ceil(totalSingleGames / 5)}
            active={singlePage}
            setActive={setActiveSinglePage}
          />
        </div>
        <div className="flex flex-col items-center">
          <UserGamesList type="DUEL" games={duelGames} />
          <Pagination
            // for pages here, we need total Math.ceil(totalDuelGames / 5)
            pages={Math.ceil(totalDuelGames / 5)}
            active={duelPage}
            setActive={setActiveDuelPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserMatchHistory;
