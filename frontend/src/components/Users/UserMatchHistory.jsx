import { useState } from "react";
import UserGamesList from "./UserGamesList";
import Pagination from "../SmallComponents/Pagination";
import useGames from "../../hooks/useGames";
import useNotification from "../../hooks/useNotification";
import UserMatchHistoryLoadingElement from "./UserMatchHistoryLoading";

// I think we can move the pagination state to this component, as well as get the single games and duel games data here through the hook, but we will need a user id from above, additionally, total single and total duel games we can also get from the hook

const UserMatchHistory = ({ userId }) => {
  const [activeSinglePage, setActiveSinglePage] = useState(1);
  const [activeDuelPage, setActiveDuelPage] = useState(1);
  const { displayNotification } = useNotification();

  const { data, isLoading, error, isError } = useGames(
    userId,
    activeSinglePage,
    activeDuelPage
  );

  if (isError) displayNotification("error", error.message);

  return (
    <div className="my-[1rem] lg:my-[4.6rem]">
      <h3 className="text-3xl md:text-4xl font-bold text-center">
        Match History
      </h3>
      {isLoading && <UserMatchHistoryLoadingElement />}
      {!isLoading && (
        <div className="flex flex-col lg:flex-row justify-between xl:w-[62rem] text-center">
          {/* for both single and duels, last 5(10?) games with functionality to load more and scroll */}
          <div className="flex flex-col items-center">
            <UserGamesList type="SINGLE" games={data.singleGames} />
            <Pagination
              // for pages here, we need total Math.ceil(totalSingleGames / 5)
              pages={Math.ceil(data.totalSingleGames / 5)}
              active={activeSinglePage}
              setActive={setActiveSinglePage}
            />
          </div>
          <div className="flex flex-col items-center">
            <UserGamesList type="DUEL" games={data.duelGames} />
            <Pagination
              // for pages here, we need total Math.ceil(totalDuelGames / 5)
              pages={Math.ceil(data.totalDuelGames / 5)}
              active={activeDuelPage}
              setActive={setActiveDuelPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMatchHistory;
